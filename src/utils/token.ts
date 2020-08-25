import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import IUser from '../interfaces/IUser';
import IResponse from '../interfaces/IResponse';

const JWT_KEY = 'WinterIsComingGOT2019';

export const generateToken = (user: IUser) => {
    return jwt.sign({username: user.username}, JWT_KEY, {
        expiresIn: '3h' // expires in 3 hours
   });
}

export const verifyToken = (req: Request, res: Response, next: any) => {
    if (!req.body.token) {
        return false;
    }

    const token = req.body.token;

    try{
        return jwt.verify(token, JWT_KEY);
    }catch (err){
        return false;
    }
}

export const canAccess = (router: Router) => {
    router.use((req: Request, res:Response, next:any) => {
        const token = verifyToken(req, res, next);
        if (token) {
            next();
        } else {
            const response = {
                status: -1,
                status_txt: 'Unauthorized',
                data: []
            } as IResponse;

            res.json(response);
        }
    });
}