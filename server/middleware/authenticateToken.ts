import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export interface IGetUserAuthInfoRequest extends express.Request {
  user: string | jwt.JwtPayload | undefined
}

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const AuthenticateToken = (req: IGetUserAuthInfoRequest, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No entry without a soul (token)." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Your session has expired." });
        req.user = user;
        next();
    });
};

export default AuthenticateToken;