import { Request, Response, NextFunction } from 'express';
import firebase from '../loaders/firebase';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).json({ message: 'No token provided' });
  }

  if (headerToken.split(' ')[0] !== 'Bearer') {
    return response.status(401).json({ message: 'Invalid token' });
  }

  const token = headerToken.split(' ')[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then((rest) => {
      request.user = rest;
      return next();
    })
    .catch((error) => {
      console.log(error);
      return response.status(403).json({ message: 'Could not authorize' });
    });
}

export default authMiddleware;
