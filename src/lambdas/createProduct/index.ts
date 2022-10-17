import { APIGatewayEvent } from 'aws-lambda';
import { addItem } from '../../resolvers';
import {
    formatResponse,
    getProductDataNotValidError,
    getInternalError,
} from '../../helpers';


export const handler = async (event: APIGatewayEvent) => {
    if (!event.body) {
        return getProductDataNotValidError();
    }

    const { title, description, price, count } = Object.fromEntries(
        decodeURIComponent(event.body)
            .split('&')
            .map(item => item.split('='))
    );

    const id = Math.floor(Math.random() * 1000);

    const product = { id, title, description, price };
    const stock = { id, count };

    if (!title || !description || !price || !count) {
        return getProductDataNotValidError();
    }

    return Promise.resolve()
        .then(() => addItem('products', product))
        .then(() => addItem('stock', stock))
        .then(() => formatResponse({ body: { id } }))
        .catch((error) => {
            console.error('[Error] createProduct failed due to ', error);

            return getInternalError();
        });
};
