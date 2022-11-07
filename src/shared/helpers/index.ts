import csv from 'csv-parser';
import { Readable } from 'stream';


const formatResponse = ({ body, statusCode = 200, headers = {} }: {
    body: any,
    statusCode?: number,
    headers?: { [k: string]: string },
}) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
        'Access-Control-Allow-Origin': '*',
        ...headers,
    },
});

export const getDefaultResponse = (body: any) => formatResponse({ body });

export const getProductDataNotValidError = () => formatResponse({
    statusCode: 400,
    body: { error: 'product data is not valid' },
});

export const getInternalError = () => formatResponse({
    statusCode: 500,
    body: { error: 'internal error' },
});

export const getProductNotFoundError = () => formatResponse({
    statusCode: 404,
    body: { error: 'product not found' },
});

export const parseBodyToJson = (body: string): { [k: string]: any } | null => {
    try {
        return JSON.parse(body);
    } catch (error) {
        return null;
    }
};

export const parseCsvStream = <T>(stream: T) => new Promise((resolve, reject) => {
    const results: any[] = [];

    (stream as Readable)
        .pipe(csv())
        .on('data', (data: any) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error: Error) => reject(error));
});
