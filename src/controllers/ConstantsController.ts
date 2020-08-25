import { Request, Response } from 'express';
import IResponse from '../interfaces/IResponse';
import Roles from '../constants/Roles';
import BookCategories from '../constants/BookCategories';
import BranchesOfLibrary from '../constants/BranchesOfLibrary';

export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = {
            status: 1,
            status_txt: 'OK',
            data: Roles
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

export const getBookCategories = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = {
            status: 1,
            status_txt: 'OK',
            data: BookCategories
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

export const getBranchesOfLibrary = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = {
            status: 1,
            status_txt: 'OK',
            data: BranchesOfLibrary
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