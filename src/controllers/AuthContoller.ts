import { Request, Response } from 'express';

import User from '../models/Users';
import IResponse from '../interfaces/IResponse';
import { generateToken } from '../utils/token';

export const login = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const body = req.body;
        let isPasswordValid = false;
        let response: IResponse = {
            status: 0,
            status_txt: 'Login failed!',
            data: {}
        };

        const user:any = await User.findAll<User>({ where: { username: body.username }, plain: true, raw: true });

        if (user) {
            const bcrypt = require('bcrypt');
            const checkPassword = bcrypt.compareSync(body.password, user.password);

            if (checkPassword) {
                isPasswordValid = true;
            }

            if (isPasswordValid) {
                const token = generateToken(user);

                if (user.approved) {
                    response = {
                        status: 1,
                        status_txt: 'Login successful!',
                        data: {
                            token,
                            userID: user.id
                        }
                    };
                } else {
                    response = {
                        status: 0,
                        status_txt: 'User not approved!',
                        data: {}
                    };
                }
            } else {
                response = {
                    status: 0,
                    status_txt: 'Invalid password!',
                    data: {}
                };
            }
        }

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response:IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}