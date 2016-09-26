'use strict';

/**
 * @file Entrypoint of the application.
 */

const express = require('express');
const app = express();
const logger = require('winston');
const path = require('path');

module.exports = app;

//Logger config
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {'timestamp': true});

//If https enabled we are behind a reverse proxy
if (process.env.HTTPS_ENABLED === 'true') {
    app.set('trust proxy', 1);
}

//Serve all the static files
app.use(express.static(path.join(__dirname, 'dist')));

//Render the app on every routes
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

startServer();

/**
 * Starts the web server.
 */
function startServer() {
    var port = process.env.PORT || 8080;
    app.listen(port)
        .on('error', function(err) {
            logger.error("Cannot start the server", err);
        })
        .on('listening', function() {
            logger.info("The server is up and running on " + port );
        });
}

exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');

/**
 * Add a signal listener to exit gently.
 *
 * @param signal - The signal to listen for.
 */
function exitOnSignal(signal) {
    process.on(signal, function () {
        logger.warn("Caught " + signal + ", shutting down");
        process.exit(1);
    });
}
