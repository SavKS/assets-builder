const gulp = require('gulp');
const express = require('express');
const log = require('fancy-log');
const qs = require('qs');
const colors = require('colors/safe');
const decache = require('decache');
const nocache = require('nocache');
const cors = require('cors');
const { createHttpTerminator } = require('http-terminator');

const config = require('../../config');

const startServer = () => {
    decache('../../server/routes');

    const app = express();
    const port = config.mockServer.port;
    const Router = require('./mockServer/Router');
    const routers = require('../../server/routes');
    const router = new Router(app);

    app.use(
        express.json()
    );
    app.use(
        cors()
    );
    app.use(
        express.urlencoded({ extended: true })
    );

    app.use(
        nocache()
    );

    app.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    app.use((request, response, next) => {
        let color;

        switch (request.method) {
            case 'GET':
                color = 'green';
                break;

            case 'POST':
                color = 'yellow';
                break;

            case 'PUT':
                color = 'cyan';
                break;

            case 'DELETE':
                color = 'red';
                break;

            default:
                color = 'white';
        }

        log(`Mock server request: ${ colors[ color ](request.method) } ${ colors.magenta(`${ request.path }${ Object.keys(request.query).length ? `?${ qs.stringify(request.query) }` : '' }`) }`);

        next();
    });

    routers(router);

    const server = app.listen(port, () => {
        log(`Mock server started: http://localhost:${ port }`);
    });

    const httpTerminator = createHttpTerminator({ server });

    return async () => await httpTerminator.terminate();
};

module.exports = () => () => {
    let terminate = startServer();

    gulp.watch(
        config.mockServer.routesPath,
        gulp.series([
            async () => {
                log('Mock server restarting...');

                await terminate();

                terminate = startServer();
            }
        ])
    );
};
