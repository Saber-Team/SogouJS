/**
 * @fileoverview 键盘事件封装类.
 * @author Leo.Zhang
 * @email zmike86@gmail.com
 * @see ../../demos/keyhandler.html
 */

define([
    '../util/util',
    './browserevent',
    './keyeventtype'
  ],
  function(util, BrowserEvent, KeyEventType) {

    'use strict';

    /**
     * 这个事件类相对于type是KeyEventType.KEY的事件. 对象中标准化了key code.
     * @param {number} keyCode 统一过的key code.
     * @param {number} charCode 字符的unicode码.
     * @param {boolean} repeat 是否重复按下产生的(比如用户长按某键).
     * @param {Event} browserEvent Browser event object.
     * @constructor
     * @extends {BrowserEvent}
     */
    var KeyEvent = function(keyCode, charCode, repeat, browserEvent) {

      BrowserEvent.call(this, browserEvent);

      this.type = KeyEventType.KEY;

      /**
       * Keycode of key press.
       * @type {number}
       */
      this.keyCode = keyCode;

      /**
       * Unicode character code.
       * @type {number}
       */
      this.charCode = charCode;

      /**
       * 是否键盘自动产生(generated by keyboard)的重复按键(当用户长按某键时会发生这情况)
       * @type {boolean}
       */
      this.repeat = repeat;
    };

    util.inherits(KeyEvent, BrowserEvent);

    return KeyEvent;
  }
);
