const config = require('config');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;

const logFormat = printf(({ level, message, timestamp}) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: config.get('logLevel'),
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [new transports.Console()]
});

module.exports = {logger};