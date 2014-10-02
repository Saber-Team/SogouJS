/**
 * @fileoverview Hash Map.
 *     This file contains an implementation of a Map structure. It implements a lot
 *     of the methods used in goog.structs so those functions work on hashes. This
 *     is best suited for complex key types. For simple keys such as numbers and
 *     strings, and where special names like __proto__ are not a concern, consider
 *     using the lighter-weight utilities in goog.object.
 * @modified Leo.Zhang
 * @email zmike86@gmail.com
 */

define('Sogou.DS.Map',
    [
        'Sogou.Util',
        'Sogou.Iter.Iterator',
        'Sogou.Iter.StopIteration',
        'Sogou.Object'
    ],
    function(util, Iterator, StopIteration, object) {

        'use strict';

        /**
         * Class for Hash Map datastructure.
         * @param {*=} opt_map Map or Object to initialize the map with.
         * @param {...*} var_args If 2 or more arguments are present then they
         *     will be used as key-value pairs.
         * @constructor
         */
        var Map = function(opt_map, var_args) {

            /**
             * Underlying JS object used to implement the map.
             * @type {!Object}
             * @private
             */
            this.map_ = {};

            /**
             * An array of keys. This is necessary for two reasons:
             *   1. Iterating the keys using for (var key in this.map_) allocates an
             *      object for every key in IE which is really bad for IE6 GC perf.
             *   2. Without a side data structure, we would need to escape all the keys
             *      as that would be the only way we could tell during iteration if the
             *      key was an internal key or a property of the object.
             *
             * This array can contain deleted keys so it's necessary to check the map
             * as well to see if the key is still in the map (this doesn't require a
             * memory allocation in IE).
             * @type {!Array.<string>}
             * @private
             */
            this.keys_ = [];

            var argLength = arguments.length;

            if (argLength > 1) {
                if (argLength % 2) {
                    throw Error('Uneven number of arguments');
                }
                for (var i = 0; i < argLength; i += 2) {
                    this.set(arguments[i], arguments[i + 1]);
                }
            } else if (opt_map) {
                this.addAll(/** @type {Object} */ (opt_map));
            }
        };

        /**
         * The number of key value pairs in the map.
         * @private
         * @type {number}
         */
        Map.prototype.count_ = 0;

        /**
         * Version used to detect changes while iterating.
         * @private
         * @type {number}
         */
        Map.prototype.version_ = 0;

        /**
         * @return {number} The number of key-value pairs in the map.
         */
        Map.prototype.getCount = function() {
            return this.count_;
        };

        /**
         * Returns the values of the map.
         * @return {!Array} The values in the map.
         */
        Map.prototype.getValues = function() {
            this.cleanupKeysArray_();

            var rv = [];
            for (var i = 0; i < this.keys_.length; i++) {
                var key = this.keys_[i];
                rv.push(this.map_[key]);
            }
            return rv;
        };

        /**
         * Returns the keys of the map.
         * @return {!Array.<string>} Array of string values.
         */
        Map.prototype.getKeys = function() {
            this.cleanupKeysArray_();
            return /** @type {!Array.<string>} */ (this.keys_.concat());
        };

        /**
         * Whether the map contains the given key.
         * @param {*} key The key to check for.
         * @return {boolean} Whether the map contains the key.
         */
        Map.prototype.containsKey = function(key) {
            return Map.hasKey_(this.map_, key);
        };

        /**
         * Whether the map contains the given value. This is O(n).
         * @param {*} val The value to check for.
         * @return {boolean} Whether the map contains the value.
         */
        Map.prototype.containsValue = function(val) {
            for (var i = 0; i < this.keys_.length; i++) {
                var key = this.keys_[i];
                if (Map.hasKey_(this.map_, key) && this.map_[key] == val) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Whether this map is equal to the argument map.
         * @param {goog.structs.Map} otherMap The map against which to test equality.
         * @param {function(?, ?) : boolean=} opt_equalityFn Optional equality function
         *     to test equality of values. If not specified, this will test whether
         *     the values contained in each map are identical objects.
         * @return {boolean} Whether the maps are equal.
         */
        Map.prototype.equals = function(otherMap, opt_equalityFn) {
            if (this === otherMap) {
                return true;
            }

            if (this.count_ != otherMap.getCount()) {
                return false;
            }

            var equalityFn = opt_equalityFn || Map.defaultEquals;

            this.cleanupKeysArray_();
            for (var key, i = 0; key = this.keys_[i]; i++) {
                if (!equalityFn(this.get(key), otherMap.get(key))) {
                    return false;
                }
            }

            return true;
        };

        /**
         * Default equality test for values.
         * @param {*} a The first value.
         * @param {*} b The second value.
         * @return {boolean} Whether a and b reference the same object.
         */
        Map.defaultEquals = function(a, b) {
            return a === b;
        };

        /**
         * @return {boolean} Whether the map is empty.
         */
        Map.prototype.isEmpty = function() {
            return this.count_ == 0;
        };

        /**
         * Removes all key-value pairs from the map.
         */
        Map.prototype.clear = function() {
            this.map_ = {};
            this.keys_.length = 0;
            this.count_ = 0;
            this.version_ = 0;
        };

        /**
         * Removes a key-value pair based on the key. This is O(logN) amortized due to
         * updating the keys array whenever the count becomes half the size of the keys
         * in the keys array.
         * @param {*} key  The key to remove.
         * @return {boolean} Whether object was removed.
         */
        Map.prototype.remove = function(key) {
            if (Map.hasKey_(this.map_, key)) {
                delete this.map_[key];
                this.count_--;
                this.version_++;

                // clean up the keys array if the threshhold is hit
                if (this.keys_.length > 2 * this.count_) {
                    this.cleanupKeysArray_();
                }

                return true;
            }
            return false;
        };

        /**
         * Cleans up the temp keys array by removing entries that are no longer in the
         * map.
         * @private
         */
        Map.prototype.cleanupKeysArray_ = function() {
            if (this.count_ != this.keys_.length) {
                // First remove keys that are no longer in the map.
                var srcIndex = 0;
                var destIndex = 0;
                while (srcIndex < this.keys_.length) {
                    var key = this.keys_[srcIndex];
                    if (Map.hasKey_(this.map_, key)) {
                        this.keys_[destIndex++] = key;
                    }
                    srcIndex++;
                }
                this.keys_.length = destIndex;
            }

            if (this.count_ != this.keys_.length) {
                // If the count still isn't correct, that means we have duplicates. This can
                // happen when the same key is added and removed multiple times. Now we have
                // to allocate one extra Object to remove the duplicates. This could have
                // been done in the first pass, but in the common case, we can avoid
                // allocating an extra object by only doing this when necessary.
                var seen = {};
                var srcIndex = 0;
                var destIndex = 0;
                while (srcIndex < this.keys_.length) {
                    var key = this.keys_[srcIndex];
                    if (!(Map.hasKey_(seen, key))) {
                        this.keys_[destIndex++] = key;
                        seen[key] = 1;
                    }
                    srcIndex++;
                }
                this.keys_.length = destIndex;
            }
        };

        /**
         * Returns the value for the given key.  If the key is not found and the default
         * value is not given this will return {@code undefined}.
         * @param {*} key The key to get the value for.
         * @param {*=} opt_val The value to return if no item is found for the given
         *     key, defaults to undefined.
         * @return {*} The value for the given key.
         */
        Map.prototype.get = function(key, opt_val) {
            if (Map.hasKey_(this.map_, key)) {
                return this.map_[key];
            }
            return opt_val;
        };

        /**
         * Adds a key-value pair to the map.
         * @param {*} key The key.
         * @param {*} value The value to add.
         * @return {*} Some subclasses return a value.
         */
        Map.prototype.set = function(key, value) {
            if (!(Map.hasKey_(this.map_, key))) {
                this.count_++;
                this.keys_.push(key);
                // Only change the version if we add a new key.
                this.version_++;
            }
            this.map_[key] = value;
        };

        /**
         * Adds multiple key-value pairs from another goog.structs.Map or Object.
         * @param {Object} map  Object containing the data to add.
         */
        Map.prototype.addAll = function(map) {
            var keys, values;
            if (map instanceof Map) {
                keys = map.getKeys();
                values = map.getValues();
            } else {
                keys = object.getKeys(map);
                values = object.getValues(map);
            }
            // we could use goog.array.forEach here but I don't want to introduce that
            // dependency just for this.
            for (var i = 0; i < keys.length; i++) {
                this.set(keys[i], values[i]);
            }
        };

        /**
         * Clones a map and returns a new map.
         * @return {!Map} A new map with the same key-value pairs.
         */
        Map.prototype.clone = function() {
            return new Map(this);
        };

        /**
         * Returns a new map in which all the keys and values are interchanged
         * (keys become values and values become keys). If multiple keys map to the
         * same value, the chosen transposed value is implementation-dependent.
         *
         * It acts very similarly to {goog.object.transpose(Object)}.
         *
         * @return {!Map} The transposed map.
         */
        Map.prototype.transpose = function() {
            var transposed = new Map();
            for (var i = 0; i < this.keys_.length; i++) {
                var key = this.keys_[i];
                var value = this.map_[key];
                transposed.set(value, key);
            }

            return transposed;
        };

        /**
         * @return {!Object} Object representation of the map.
         */
        Map.prototype.toObject = function() {
            this.cleanupKeysArray_();
            var obj = {};
            for (var i = 0; i < this.keys_.length; i++) {
                var key = this.keys_[i];
                obj[key] = this.map_[key];
            }
            return obj;
        };

        /**
         * Returns an iterator that iterates over the keys in the map.  Removal of keys
         * while iterating might have undesired side effects.
         * @return {!goog.iter.Iterator} An iterator over the keys in the map.
         */
        Map.prototype.getKeyIterator = function() {
            return this.__iterator__(true);
        };

        /**
         * Returns an iterator that iterates over the values in the map.  Removal of
         * keys while iterating might have undesired side effects.
         * @return {!goog.iter.Iterator} An iterator over the values in the map.
         */
        Map.prototype.getValueIterator = function() {
            return this.__iterator__(false);
        };


        /**
         * Returns an iterator that iterates over the values or the keys in the map.
         * This throws an exception if the map was mutated since the iterator was
         * created.
         * @param {boolean=} opt_keys True to iterate over the keys. False to iterate
         *     over the values.  The default value is false.
         * @return {!goog.iter.Iterator} An iterator over the values or keys in the map.
         */
        Map.prototype.__iterator__ = function(opt_keys) {
            // Clean up keys to minimize the risk of iterating over dead keys.
            this.cleanupKeysArray_();

            var i = 0;
            var keys = this.keys_;
            var map = this.map_;
            var version = this.version_;
            var selfObj = this;

            var newIter = new goog.iter.Iterator;
            newIter.next = function() {
                while (true) {
                    if (version != selfObj.version_) {
                        throw Error('The map has changed since the iterator was created');
                    }
                    if (i >= keys.length) {
                        throw goog.iter.StopIteration;
                    }
                    var key = keys[i++];
                    return opt_keys ? key : map[key];
                }
            };
            return newIter;
        };

        /**
         * Safe way to test for hasOwnProperty.  It even allows testing for
         * 'hasOwnProperty'.
         * @param {Object} obj The object to test for presence of the given key.
         * @param {*} key The key to check for.
         * @return {boolean} Whether the object has the key.
         * @private
         */
        Map.hasKey_ = function(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        };

        return Map;
    }
);