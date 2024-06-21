const DEV = 'develop';
const TRIAL = 'trial';
const RELEASE = 'release';

const { miniProgram, plugin = {} } = wx.getAccountInfoSync();
if (!miniProgram.envVersion) {
    if (typeof __wxConfig === 'object') {
        console.info('__wxConfig is available');
        miniProgram.envVersion = __wxConfig.envVersion || RELEASE;
    }
}

let _env_version = miniProgram.envVersion;

const launchOptions = wx.getLaunchOptionsSync();
if (launchOptions.query && launchOptions.query.env) {
    _env_version = launchOptions.query.env;
}

let _CTX = {};

function _attr(env, arg1, arg2) {
    if (arguments.length === 0) {
        return {};
    } else if (arguments.length === 1) {
        return _CTX[env];
    } else if (arguments.length === 2) {
        return _CTX[env][arg1];
    } else {
        _CTX[env][arg1] = arg2;
        return this;
    }
}

const defaultEnv = {
    get current() {
        return _env_version;
    },
    set current(value) {
        _env_version = value;
        return _env_version;
    },
    get miniProgram() {
        return miniProgram;
    },
    get plugin() {
        return plugin;
    },
    register(envName) {
        if (_CTX[envName]) {
            console.warn(`env:${envName} already exists!`);
            return this;
        }
        _CTX[envName] = {};
        this[envName] = function() {
            return _attr.call(this, envName, ...arguments);
        };
        return this;
    },
    get(key, envName = this.current) {
        return this[envName].apply(this, Array.prototype.slice.call(arguments, 0, 1));
    },
    set(key, value, envName = this.current) {
        return _attr.call(this, envName, ...arguments);
    },
    mount(host, key = 'env') {
        if (host) {
            host[key] = this;
        } else {
            globalThis[key] = this;
        }
    }
};

defaultEnv.register(DEV).register(TRIAL).register(RELEASE);

module.exports = defaultEnv;
