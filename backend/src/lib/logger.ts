import pino from "pino";

// TODO: development 時のみ "debug" と "pino-pretty" を有効にする
export const logger = pino({
  level: "debug",
  transport: { target: "pino-pretty" },
});
