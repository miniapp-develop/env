Page({
    data: {},
    onLoad(query) {
        env.develop('baseUrl', 'https://dev.api.demo.com');
        env.develop('debug', false);
        env.trial('baseUrl', 'https://trial.api.demo.com');
        env.release('baseUrl', 'https://api.demo.com');

        console.log('env.develop() = ', env.develop()); //{baseUrl: "https://dev.api.demo.com",debug: false}
        console.log('env.trial() = ', env.trial()); //{baseUrl: "https://trial.api.demo.com"}
        console.log('env.release() = ', env.release()); //{baseUrl: "https://api.demo.com"}

        console.log(`env.get('baseUrl', 'develop') = `, env.get('baseUrl', 'develop')); // 'https://dev.api.demo.com'
        console.log(`env.get('baseUrl', 'trial') = `, env.get('baseUrl', 'trial')); // 'https://trial.api.demo.com'
        env.set('baseUrl', 'https://new_api.demo.com', 'release');
        console.log(`env.get('baseUrl', 'release') = `, env.get('baseUrl', 'release')); // 'https://api.api.demo.com'
        this.handleInspect();
    },
    handleInspect() {
        console.log('当前 env = ', env.current);
        console.log(env.get());
        console.log(env.get('baseUrl'));
    },
    onTapInspect() {
        this.handleInspect();
    },
    onTapEnv(e) {
        env.current = e.target.dataset.env;
        this.handleInspect();
    },
    onTapNewEnv(e) {
        env.register('test');
        env.current = 'test';
        env.test('baseUrl', 'https://test.api.demo.com');
        this.handleInspect();
    }
});
