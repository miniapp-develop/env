const DEV = 'develop';
const TRIAL = 'trial';
const RELEASE = 'release';

const {miniProgram, plugin = {}} = wx.getAccountInfoSync();
if (!miniProgram.envVersion) {
    if (typeof __wxConfig === 'object') {
        miniProgram.envVersion = __wxConfig.envVersion || RELEASE;
    } else {
        console.warn('__wxConfig is unknown');
        miniProgram.envVersion = RELEASE;
    }
}

let CTX = {};

function _attr(env, arg1, arg2) {
    if (arguments.length === 0) {
        return {};
    } else if (arguments.length === 1) {
        return CTX[env];
    } else if (arguments.length === 2) {
        return CTX[env][arg1];
    } else {
        CTX[env][arg1] = arg2;
        return this;
    }
}

let __env = miniProgram.envVersion;

const defaultEnv = {
    get current() {
        return __env;
    },
    set current(value) {
        __env = value;
        return __env;
    },
    get miniProgram() {
        return miniProgram;
    },
    get plugin() {
        return plugin;
    },
    register(envName) {
        if (CTX[envName]) {
            console.warn(`env:${envName} already exists!`)
            return this;
        }
        CTX[envName] = {};
        this[envName] = function () {
            return _attr.call(this, envName, ...arguments);
        }
        return this;
    },
    get(key, env = this.current) {
        return this[env].apply(this, Array.prototype.slice.call(arguments, 0, 1));
    },
    set(key, value, env = this.current) {
        return _attr.call(this, env, ...arguments);
    },
    initApp(opt = {}) {
        if (!opt.query) {
            return
        }
        if (opt.query.env) {
            this.current = opt.query.env;
        }
    }
};

defaultEnv.register(DEV).register(TRIAL).register(RELEASE);

module.exports = defaultEnv;