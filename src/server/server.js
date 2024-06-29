const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

const routes = require('./routes');

dotenv.config();


const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    })

    server.route(routes);

    server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        if(response instanceof Error){
            console.error(response.stack);
            
            const errorResponse = h.response({
                status: 'fail',
                message: response.stack,
            })

            errorResponse.code(500);
            return errorResponse;
        }
    })

    await server.start();

    console.log(`Server started at ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => {
    console.error(error.stack);
    process.exit(1);
})

init();