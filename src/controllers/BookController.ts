import { Request, Response } from 'express';

import Book from '../models/Books';
import IResponse from '../interfaces/IResponse';

export const createBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        const newBook: any = await Book.create<Book>(body);
        const response: IResponse = {
            status: 1,
            status_txt: 'Book created!',
            data: {
                title: newBook.title
            }
        };
        return res.json(response);

    } catch (e) {
        console.log(e)
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const getBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const books = await Book.findAll<Book>({ where: { branch_of_library: req.body.branch_of_library } });

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
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const getBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const book = await Book.findAll<Book>({ where: { id: req.body.id }, plain: true, raw: true});

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
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const updateBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;

        let response: IResponse = {
            status: 0,
            status_txt: 'Book update unsuccessful!',
            data: []
        };

        const result = await Book.update<Book>(body, { where: {id: body.id} });

        if (result) {
            const updatedBook: any = await Book.findAll<Book>({ where: { id: body.id }, plain: true, raw: true});
            response = {
                status: 1,
                status_txt: 'Book updated successful!',
                data: updatedBook
            };
        }

        return res.json(response);
    }
    catch (e) {
        console.log(e);
        const response: IResponse = {
            status: 0,
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}

export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const book = await Book.destroy({ where: { id: req.body.id } });
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
            status_txt: 'An error occured',
            data: []
        };

        return res.json(response);
    }
}