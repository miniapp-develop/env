const context = require('../../libs/index');

Page({
    data: {},
    onLoad(query) {
        console.log(context.miniProgram);
        console.log(context.plugin);

        context.develop('baseUrl', 'https://dev.api.demo.com');
        context.develop('debug', false);
        context.trial('baseUrl', 'https://trial.api.demo.com');
        context.release('baseUrl', 'https://api.demo.com');

        console.log(context.develop('baseUrl')); // 'https://dev.api.demo.com'
        console.log(context.trial('baseUrl')); // 'https://trial.api.demo.com'
        console.log(context.release('baseUrl')); // 'https://api.api.demo.com'

        console.log(context.get());//{baseUrl: "https://dev.api.demo.com",debug: false}
        console.log(context.get('baseUrl')); // depends on env
        console.log(context.get('baseUrl', 'develop'));// 'https://dev.api.demo.com'
        console.log(context.get('baseUrl', 'trial'));// 'https://trial.api.demo.com'
        console.log(context.get('baseUrl', 'release')); // 'https://api.api.demo.com'

        context.env = 'develop';
        console.log(context.get('baseUrl'));// 'https://dev.api.demo.com'
        context.env = 'trial';
        console.log(context.get('baseUrl'));// 'https://trial.api.demo.com'
        context.env = 'release';
        console.log(context.get('baseUrl')); // 'https://api.api.demo.com'
    }
});
