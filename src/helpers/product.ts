import { randomBytes } from 'crypto';
import { Product } from '../types/api-types';


export const generateProductId = () => {
    return randomBytes(16).toString('hex');
};

export const isProduct = (data: any): data is Product => {
    return (
        (typeof data === 'object') &&
        [
            'id',
            'title',
            'description',
            'price',
            'count'
        ].every(prop => prop in data)
    );
};
