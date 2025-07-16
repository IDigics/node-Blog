import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = 
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

    console.log('Client IP:', clientIp);

    const allowedIp = '192.168.1.82'; 

    if (clientIp !== allowedIp) {
      return res.status(403).send('Access denied');
    }
    next();
  }
}

