var grunt = require('grunt');

module.exports = {
    build: {
        src: ['src/*.debug.js', 'src/*/**.debug.js']
    },
    // options here to override JSHint defaults
    options: {
        bitwise: false,         // ����λ�����
        camelcase: false,       // �Ƿ�ֻ�����շ��������»��������Ĵ�д����
        curly: false,           // ѭ��ʱ��ǿ��������
        eqeqeq: true,           // ===����==
        es3: true,              // ��Ȼ��Ҫ֧��IE678
        forin: false,           // ����������Ҫȫ��for-in
        freeze: true,           // ��ֹ�޸�ԭ������
        immed: true,            // ֱ�ӵ��õĺ�����Ҫwrapper
        indent: true,           // ����ȫ��tab
        latedef: false,         // ͬundef
        newcap: true,           // ���캯����Ҫ��д
        noarg: true,            // ����arguments.callee
        noempty: true,          // �����пհ״����
        nonbsp: false,          //
        nonew: true,            // ���캯��ֻ��ͨ��new���������
        plusplus: false,
        quotmark: 'single',     // �ַ���ȫ��������
        undef: true,            // ����ʹ��δ����ı���
        unused: 'vars',         // ��鶨�嵫δ��ʹ�õı���, �������β�     
        strict: true,           // ES5���ϸ�ģʽ
        maxparams: false,       // �������β�����
        maxdepth: false,        // �����ƴ������Ƕ���
        maxstatements: 200,     // ÿ�����������Ŀ��󲻳���200
        maxcomplexity: false,
        maxlen: 120,            // ÿ�д�����󳤶�
        
        asi: true,              // ����ʡ�Բ���Ҫ�ķֺ�
        boss: true,
        debug: false,           // Ĭ�ϴ����в�����debugger
        evil: false,            // ��������eval
        laxcomma: false,
        browser: true,          // ���������
        devel: true,            // ��Ҫ����alert console.log�ȴ���
        

        globals: {
            sogou: false,
            module: false,
            define: false
        },
        reporter: require('jshint-stylish'),
        ignores: ['scripts/', 'build/'],
        force: true
    }
};