# miniapp env config

## usage

```javascript
    env.develop('baseUrl', 'https://dev.api.demo.com');
    env.develop('debug', false);
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
```

## changelog

### 2021.10.21

1. init