# miniapp context config

## usage

```javascript
const context = require('path to context src');
    console.log(context.miniProgram);
    console.log(context.plugin);

    context.develop('baseUrl', 'https://dev.api.demo.com');
    context.develop('debug', false);
    context.trial('baseUrl', 'https://trial.api.demo.com');
    context.release('baseUrl', 'https://api.demo.com');

    console.log(context.develop('baseUrl'));
    console.log(context.trial('baseUrl'));
    console.log(context.release('baseUrl'));

    console.log(context.get());
    console.log(context.get('baseUrl'));
    console.log(context.get('baseUrl', 'develop'));
    console.log(context.get('baseUrl', 'trial'));
    console.log(context.get('baseUrl', 'release'));

```

## changelog

### 2021.10.21

1. init