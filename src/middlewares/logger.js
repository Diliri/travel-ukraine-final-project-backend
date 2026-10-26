import pino from "pino-http";

const pretty = process.env.NODE_ENV !== "production";
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  ...(pretty && {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "HH:MM:ss" },
    },
  }),
});
