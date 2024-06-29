const {
    getRootHandler
} = require('./handler');

const routes = [
    {
        path: '/',
        method: 'GET',
        handler: getRootHandler,
    }
]

module.exports = routes;