import { formatInTimeZone } from 'date-fns-tz';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import { APP_NAME } from '../constants';

const appendTimestamp = winston.format((info, opts: unknown) => {
  const tz = (opts as { tz?: string } | undefined)?.tz;
  if (tz) {
    info.timestamp = formatInTimeZone(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
  }
  return info;
});

export const winstonLogger = WinstonModule.createLogger({
  format: winston.format.combine(
    appendTimestamp({ tz: 'Asia/Seoul' }),
    winston.format.json(),
    process.env.NODE_ENV !== 'production'
      ? winston.format.colorize({ all: true })
      : winston.format.uncolorize(),
    winston.format.printf((info) => {
      const stack =
        info.stack || info.trace ? `\n${info.stack || info.trace}` : '';
      return `[${APP_NAME}] - ${info.level} [${process.pid}] ${info.timestamp} : ${info.message}${stack}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});
