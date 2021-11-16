import { Request } from 'express';

export const getUserIp = function (req: Request) {
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return addr;
};
