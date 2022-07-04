const env = require('../../libs/index');

Page({
    data: {},
    onLoad(query) {
        console.log(env.miniProgram);
        console.log(env.plugin);
        console.log(env.current);

        env.develop('baseUrl', 'https://dev.api.demo.com');
        env.set('debug', false, 'develop');
        env.trial('baseUrl', 'https://trial.api.demo.com');
        env.release('baseUrl', 'https://api.demo.com');

        console.log(env.develop('baseUrl')); // 'https://dev.api.demo.com'
        console.log(env.trial('baseUrl')); // 'https://trial.api.demo.com'
        console.log(env.release('baseUrl')); // 'https://api.api.demo.com'

        console.log(env.get());//{baseUrl: "https://dev.api.demo.com",debug: false}
        console.log(env.get('baseUrl')); // depends on env
        console.log(env.get('baseUrl', 'develop'));// 'https://dev.api.demo.com'
        console.log(env.get('baseUrl', 'trial'));// 'https://trial.api.demo.com'
        console.log(env.get('baseUrl', 'release')); // 'https://api.api.demo.com'

        env.current = 'develop';
        console.log(env.get('baseUrl'));// 'https://dev.api.demo.com'
        env.current = 'trial';
        console.log(env.get('baseUrl'));// 'https://trial.api.demo.com'
        env.current = 'release';
        console.log(env.get('baseUrl')); // 'https://api.api.demo.com'
    },

    onTapEnv(e) {
        env.current = e.target.dataset.env;
        console.log(env.current);
        console.log(env.get());
        console.log(env.get('baseUrl'));
    }
});
