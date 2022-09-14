import winston, { format } from "winston";

export const errorLoger = winston.createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.printf(
      (info) =>
        `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console()
    , new winston.transports.File({ filename: 'error.log' })
  ],
});