import { randomBytes } from 'crypto';
import { Product } from '../types/api-types';


export const formatResponse = ({
    body,
    statusCode = 200,
    headers = {},
}: {
    body: any,
    statusCode?: number,
    headers?: { [k: string]: string },
}) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*',
    },
});

export const getProductDataNotValidError = () => formatResponse({
    statusCode: 400,
    body: { error: 'product data is not valid' },
});

export const getInternalError = () => formatResponse({
    statusCode: 500,
    body: { error: 'internal error' },
});

export const parseBodyToJson = (body: string): { [k: string]: unknown } | null => {
    try {
        return JSON.parse(body);
    } catch (error) {
        return null;
    }
};

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
