function rand (Min, Max) {
    return (Min + Math.round((Max - Min) * Math.random()));
}
global.api = {
    config: {},
    async run() {
        process.env.NODE_CONFIG_DIR = './';
        process.env.NODE_ENV = 'config';
        this.config = require('config');
        let port = (this.config.has('server.port') && this.config.get('server.port')) || 5473;
        
        let Express = require('express');
        const app = Express();

        app.get('/', (req, res) => {
            res.send('ok');
        });

        app.get('/hello', (req, res) => {
            res.send('Hello!');
        });

        app.get('/slogan', async (req, res) => {
            let slogan = await global.api.getSlogan();
            res.send({
                text: slogan
            });
        })

        app.listen(port, function() {
            console.log(`API interface listening at http://localhost:${port}`);
        });
    },
    getSlogan() {
        let slogan = (this.config.has('slogan') && this.config.get('slogan')) || "ligen.life";
        let len = slogan.length;
        let id = rand(0, len - 1);
        return slogan[id];
    }
}

global.api.run();