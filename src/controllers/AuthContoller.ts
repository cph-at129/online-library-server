import { Request, Response } from 'express';

import User from '../models/Users';
import IResponse from '../interfaces/IResponse';
import { generateToken } from '../utils/token';
import nodemailer  from 'nodemailer';
import EmailConfig from '../config/EmailConfig';

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

export const forgottenPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const user: any = await User.findAll<User>({ where: { email: body.email }, plain: true, raw: true});

        let response = {
            status: 0,
            status_txt: 'Няма данни за този е-майл!',
            data: []
        };
        if (!user) {
            return res.json(response)
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: EmailConfig.email,
              pass: EmailConfig.password
            }
        });

        const buffer = new Buffer(body.email);
        const encryptEmail = buffer.toString('base64');
          
        const mailOptions = {
            from: body.email,
            to: EmailConfig.email,
            subject: `Смяна на парола`,
            html: `Смени паролата от този <a href="http://localhost:3000/reset-password/${encryptEmail}">линк</a>`
        };

        const result = await transporter.sendMail(mailOptions);
        response = {
            status: 1,
            status_txt: 'Заявката е изпратена успешно!',
            data: result
        };

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'Възникна грешка!',
            data: []
        };

        return res.json(response);
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const buffer = new Buffer(req.body.email, 'base64')
        const decryptEmail = buffer.toString();

        const bcrypt = require('bcrypt');
        const hash = bcrypt.hashSync(body.password, 10);

        const result = await User.update<User>({ password: hash }, { where: {email: decryptEmail} });

        const response = {
            status: 1,
            status_txt: 'Паролата е променена успешно!',
            data: result
        };

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'Възникна грешка!',
            data: []
        };

        return res.json(response);
    }
}