const env = require('./libs/index');

App({
    onLaunch(opt) {
        env.initApp(opt);
    }
})