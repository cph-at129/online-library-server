import { Request, Response } from 'express';

import IResponse from '../interfaces/IResponse';

import nodemailer  from 'nodemailer';
import EmailConfig from '../config/EmailConfig';

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: EmailConfig.email,
              pass: EmailConfig.password
            }
        });
          
        const mailOptions = {
            from: body.email,
            to: EmailConfig.email,
            subject: `Запитване`,
            text: body.text
        };

        const result = await transporter.sendMail(mailOptions);
        const response = {
            status: 1,
            status_txt: 'Запитването е изпратено успешно!',
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
