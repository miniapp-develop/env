# miniapp env config

一个简单的小程序环境配置管理工具。

## usage

安装 

```shell script
npm install @mini-dev/env
```

获取/指定当前环境：
```javascript
    console.log(env.current);
    env.current = 'develop';
```

可通过编译模式增加查询参数 env={xxxx} ，在小程序启动的时候来指定环境值：

```javascript
App({
    onLaunch(opt) {
        env.initApp(opt);
    }
})
```

创建新的自定义环境：

```javascript
    env.register('stage');
    env.stage('baseUrl', 'https://stage.api.demo.com');
    console.log(env.stage('baseUrl')); // 'https://stage.api.demo.com'

```

默认已经添加了 develop、trial、release 这三个环境，对应到小程序框架的 envVersion。
 
为环境配置键值对，有两种方式。
第一种，使用环境方法：

```javascript
    env.develop('baseUrl', 'https://dev.api.demo.com');
    env.develop('debug', false);
    env.trial('baseUrl', 'https://trial.api.demo.com');
    env.release('baseUrl', 'https://api.demo.com');

    console.log(env.develop('baseUrl')); // 'https://dev.api.demo.com'
    console.log(env.trial('baseUrl')); // 'https://trial.api.demo.com'
    console.log(env.release('baseUrl')); // 'https://api.api.demo.com'
```


第二种，传递环境值作为参数

```javascript
    console.log(env.get());//{baseUrl: "https://dev.api.demo.com",debug: false}
    console.log(env.get('baseUrl')); // depends on env
    console.log(env.get('baseUrl', 'develop'));// 'https://dev.api.demo.com'
    console.log(env.get('baseUrl', 'trial'));// 'https://trial.api.demo.com'
    console.log(env.get('baseUrl', 'release')); // 'https://api.api.demo.com'
    env.set('baseUrl', 'https://new_api.demo.com', 'release');
    console.log(env.get('baseUrl', 'release')); // 'https://api.api.demo.com'

    env.current = 'develop';
    console.log(env.get('baseUrl'));// 'https://dev.api.demo.com'
    env.current = 'trial';
    console.log(env.get('baseUrl'));// 'https://trial.api.demo.com'
    env.current = 'release';
    console.log(env.get('baseUrl')); // 'https://api.api.demo.com'
```
