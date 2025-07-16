import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedIp = ['::ffff:192.168.1.82', '::1'];
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp || '';

    console.log('Client IP:', clientIp);
    console.log('Is allowed:', allowedIp.includes(clientIp));
    if (!allowedIp.includes(clientIp)) {
      return res.status(403).send('Access denied');
    }

    next();
  }
}

