const env = require('./libs/index');

App({
    onLaunch(opt) {
        if (opt.query.env) {
            env.current = opt.query.env;
        }
    }
})