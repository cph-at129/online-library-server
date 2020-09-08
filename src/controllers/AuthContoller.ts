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
            status_txt: 'Нямате достъп до системата! Моля, проверете потребителското име и паролата!',
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
                        status_txt: 'Успешен вход!',
                        data: {
                            token,
                            userID: user.id
                        }
                    };
                } else {
                    response = {
                        status: 0,
                        status_txt: 'Потребителят не е потвърден!',
                        data: {}
                    };
                }
            } else {
                response = {
                    status: 0,
                    status_txt: 'Грешна парола!',
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
            status_txt: 'Възникна грешка!',
            data: []
        };

        return res.json(response);
    }
}
