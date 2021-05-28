import config from 'config';
import {createLogger, format, transports} from 'winston';

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

export default logger;
