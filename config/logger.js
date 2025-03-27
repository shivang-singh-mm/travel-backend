const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, meta }) => {
            return `${timestamp} [${level.toUpperCase()}] [${meta.method} ${meta.url}] [Status: ${meta.status}] - ${message} ${meta.error ? "| Error: " + meta.error : ""}`;
        })
    ),
    transports: [
        new winston.transports.Console()
    ],
});

// Custom log function
const log = (level, message, req, status = 200, error = null) => {
    logger.log({
        level,
        message,
        meta: {
            method: req.method,
            url: req.originalUrl,
            status,
            timestamp: new Date().toISOString(),
            ip: req.ip,
            error: error ? error.stack || error.message : null
        }
    });
};

module.exports = log;

