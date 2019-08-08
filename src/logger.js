/* eslint-disable no-shadow */
import winston from 'winston';

const CONSOLE_DATE_FORMAT = 'HH:mm:ss.SSS';

const createLogger = ({ label, level, filename }) => {
  const logger = winston.createLogger({ level });
  const hasLogFile = typeof filename === 'string' && filename.length > 0;

  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({ label }),
      winston.format.timestamp({ format: CONSOLE_DATE_FORMAT }),
      winston.format.splat(),
      winston.format.printf(({
        level, message, label, timestamp,
      }) => `${timestamp} [${label}] ${level}: ${message}`),
    ),
  }));

  if (hasLogFile) {
    logger.add(new winston.transports.File({
      filename,
      format: winston.format.combine(
        winston.format.label({ label }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.uncolorize(),
        winston.format.json(),
      ),
    }));
  }

  return logger;
};

export default createLogger;
