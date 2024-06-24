# miniapp env config

一个简单的小程序环境配置工具。

微信小程序默认有三个环境：

1. develop：对应开发版；
2. trail：对应体验版；
3. release：对应正式版；

具体的值可以在 getAccountInfoSync() 返回的对象中找到。

因此，我们可以基于这些环境值，开识别不同的环境，并配置不同环境对应的不同参数。

## 使用

### 安装

```shell script
npm install @mini-dev/env
```

### 获取/设置当前环境

```javascript
const env = require('@mini-dev/env');

console.log(env.current); // 对应具体的开发版本 develop,trail,release
env.current = 'develop'; // 手动指定当前环境为 develop
```

可通过编译模式增加查询参数 env={xxxx} ，在小程序启动的时候来指定要启用的环境：

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

### 获取/设置环境参数对

```javascript
env.set('a', 'b'); // 为当前环境（current）设置名为 'a' 值为 'b' 的参数对
env.get('a'); // 得到 'b'
env.get(); // 得到 {a:'b'}
```

也可以显式指定要配置的环境：

```javascript
env.set('a', 'b', 'trial'); // 为 trial 环境设置键为 'a' 值为 'b' 的参数对
env.get('a', 'trial') // 得到 'b'
```

以下调用是等效的：

```javascript
env.trial('a', 'b'); // 为 trial 环境设置键为 'a' 值为 'b' 的参数对
env.trial('a') // 得到 'b'
```

### mount

有时候为了方便使用，可以将 env 挂载到 app 对象或者 globalThis 上，可以避免每次都要导入模块。

```javascript
//挂载到 globalThis
env.mount();

//类似于增加了一个全局变量 env
env.get('xxx');

// 或者挂载到 app 对象
App({
    onLaunch(opt) {
        env.mount(this);
    }
});
//类似于增加了一个 app 上 env 变量
getApp().env.get('xxx');
```

mount 支持第二个参数，以便修改实际挂载的对象名称，比如：

```javascript
App({
    onLaunch(opt) {
        env.mount(this, 'theEnv');
    }
});

//类似于增加了一个 app 上 theEnv 变量
getApp().theEnv.get('xxx');
```

### 添加新环境

env 根据使用惯例，预置了 develop，trail，release 三种环境，对应到小程序框架的 envVersion，可以直接使用。如果需要其他的环境，也可以创建新的自定义环境：

```javascript
env.register('stage'); // 注册新环境
env.stage('baseUrl', 'https://stage.api.demo.com');
console.log(env.get('baseUrl', 'stage')); // 'https://stage.api.demo.com'
console.log(env.stage('baseUrl')); // 'https://stage.api.demo.com'
```

## 示例

参见 [示例小程序 sample](./sample)

## ChangeLog

### 0.1.1

1. 移除多余的依赖项；

### 0.1.0

1. 支持 mount 到全局或者指定对象（比如 app）上；

### 0.0.3

1. 支持基本的参数配置
