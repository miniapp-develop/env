const {miniProgram, plugin = {}} = wx.getAccountInfoSync();
if (!miniProgram.envVersion) {
    if (typeof __wxConfig === 'object') {
        miniProgram.envVersion = __wxConfig.envVersion;
    } else {
        console.warn('__wxConfig is unknown');
        miniProgram.envVersion = 'unknown';
    }
}

const DEV = 'develop';
const TRIAL = 'trial';
const RELEASE = 'release';

let CTX = {
    [DEV]: {},
    [TRIAL]: {},
    [RELEASE]: {},
};

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

module.exports = {
    get env() {
        return __env;
    },
    set env(value) {
        __env = value;
        return __env;
    },
    get miniProgram() {
        return miniProgram;
    },
    get plugin() {
        return plugin;
    },
    get(key, env = this.env) {
        return this[env].apply(this, Array.prototype.slice.call(arguments, 0, 1));
    },
    set(key, value, env = miniProgram.envVersion) {
        return _attr.call(this, env, ...arguments);
    },
    [DEV]() {
        return _attr.call(this, DEV, ...arguments);
    },
    [TRIAL]() {
        return _attr.call(this, TRIAL, ...arguments);
    },
    [RELEASE]() {
        return _attr.call(this, RELEASE, ...arguments);
    }
};