import { assertIsDefined } from "./assert-is-defined";

export const getEnv = (key: string) => {
  const value = process.env[key];
  return value;
};

export const unwrapEnv = (key: string) => {
  const value = process.env[key];
  assertIsDefined(value);
  return value;
};
