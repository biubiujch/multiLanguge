import winston from "winston";

export function generateID() {
  return Date.now() + Math.random().toString().slice(2, 3);
}

export const InfoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});


