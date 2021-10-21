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

        console.log(context.develop('baseUrl'));
        console.log(context.trial('baseUrl'));
        console.log(context.release('baseUrl'));

        console.log(context.get());
        console.log(context.get('baseUrl'));
        console.log(context.get('baseUrl', 'develop'));
        console.log(context.get('baseUrl', 'trial'));
        console.log(context.get('baseUrl', 'release'));
    }
});
