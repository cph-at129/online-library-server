import { Request, Response } from 'express';

import Calendar from '../models/Calendar';
import IResponse from '../interfaces/IResponse';

import nodemailer  from 'nodemailer';
import EmailConfig from '../config/EmailConfig';

export const createEvent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const newBook: any = await Calendar.create<Calendar>(body);
        const response: IResponse = {
            status: 1,
            status_txt: 'Събитието е създадено!',
            data: {
                title: newBook.title
            }
        };
        return res.json(response);

    } catch (e) {
        console.log(e)
        const response: IResponse = {
            status: 0,
            status_txt: 'Възникна грешка',
            data: []
        };

        return res.json(response);
    }
}

export const getEvents = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;
        let books = [];
        if (body.branch_of_library) {
            books =  await Calendar.findAll<Calendar>({ where: { branch_of_library: req.body.branch_of_library } });
        } else {
            books = await Calendar.findAll<Calendar>();
        }

        const response = {
            status: 1,
            status_txt: 'OK',
            data: books
        };
        
        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'Възникна грешка',
            data: []
        };

        return res.json(response);
    }
}

export const getEvent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const book = await Calendar.findAll<Calendar>({ where: { id: req.body.id }, plain: true, raw: true});

        const response = {
            status: 1,
            status_txt: 'OK',
            data: book
        };

        
        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'Възникна грешка',
            data: []
        };

        return res.json(response);
    }
}

export const updateEvent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        let response: IResponse = {
            status: 0,
            status_txt: 'Успешна актуализация на събитие!',
            data: []
        };

        const result = await Calendar.update<Calendar>(body, { where: {id: body.id} });

        if (result) {
            const updatedBook: any = await Calendar.findAll<Calendar>({ where: { id: body.id }, plain: true, raw: true});
            response = {
                status: 1,
                status_txt: 'Успешна актуализация на книга!',
                data: updatedBook
            };
        }

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'Възникна грешка',
            data: []
        };

        return res.json(response);
    }
}

export const deleteEvent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const book = await Calendar.destroy({ where: { id: req.body.id } });
        const response = {
            status: 1,
            status_txt: 'OK',
            data: book
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

export const sendEventEmail = async (req: Request, res: Response): Promise<Response> => {
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
            subject: `Запитване за събитие - ${body.title}`,
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
