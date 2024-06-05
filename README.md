# miniapp env config

一个简单的小程序环境配置管理工具。

## usage

安装

```shell script
npm install @mini-dev/env
```

获取/设置当前环境：

```javascript
console.log(env.current);
env.current = 'develop';
```

有时候为了方便使用，可以将 env 挂载到 app 对象或者 globalThis 上：

```javascript
env.mount(); //挂载到 globalThis

// 或者挂载到 app 对象

App({
    onLaunch(opt) {
        env.mount(this);
    }
});
```

可通过编译模式增加查询参数 env={xxxx} ，在小程序启动的时候来指定环境值：

```json
{
    "condition": {
        "miniprogram": {
            "list": [
                {
                    "name": "env=trial",
                    "pathName": "pages/index/index",
                    "query": "env=trial",
                    "launchMode": "default",
                    "scene": null
                },
                {
                    "name": "env=release",
                    "pathName": "pages/index/index",
                    "query": "env=release",
                    "launchMode": "default",
                    "scene": null
                }
            ]
        }
    }
}
```

env 根据使用惯例，预置了 develop，trail，release 三种环境，对应到小程序框架的 envVersion，可以直接使用。如果需要其他的环境，也可以创建新的自定义环境：

```javascript
env.register('stage'); // 注册新环境
env.stage('baseUrl', 'https://stage.api.demo.com');
console.log(env.stage('baseUrl')); // 'https://stage.api.demo.com'
```

为环境配置参数，有两种方式：

第一种，使用环境名的同名方法：

```javascript
env.develop('baseUrl', 'https://dev.api.demo.com');
env.develop('debug', false);
env.trial('baseUrl', 'https://trial.api.demo.com');
env.release('baseUrl', 'https://api.demo.com');

console.log(env.develop('baseUrl')); // 'https://dev.api.demo.com'
console.log(env.trial('baseUrl')); // 'https://trial.api.demo.com'
console.log(env.release('baseUrl')); // 'https://api.api.demo.com'
```

第二种，将环境值作为第二个参数传递给 get 方法：

```javascript
console.log(env.get()); //{baseUrl: "https://dev.api.demo.com",debug: false}
console.log(env.get('baseUrl')); // depends on env
console.log(env.get('baseUrl', 'develop')); // 'https://dev.api.demo.com'
console.log(env.get('baseUrl', 'trial')); // 'https://trial.api.demo.com'
console.log(env.get('baseUrl', 'release')); // 'https://api.api.demo.com'
env.set('baseUrl', 'https://new_api.demo.com', 'release');
console.log(env.get('baseUrl', 'release')); // 'https://api.api.demo.com'

env.current = 'develop';
console.log(env.get('baseUrl')); // 'https://dev.api.demo.com'
env.current = 'trial';
console.log(env.get('baseUrl')); // 'https://trial.api.demo.com'
env.current = 'release';
console.log(env.get('baseUrl')); // 'https://api.api.demo.com'
```

## ChangeLog

### 0.1.0

ing...

### 0.0.3

1. 支持基本的参数配置
