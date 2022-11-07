import { SQSHandler } from 'aws-lambda';
import { generateProductId } from '../../../shared/helpers/product';
import { createProduct } from '../../../shared/resolvers/product';


export const handler: SQSHandler = async (event) => {
    try {
        const promises = event.Records.map(record => {
            const { title, description, price, count } = JSON.parse(record.body);
            const id = generateProductId();

            return createProduct({
                id,
                title,
                description,
                price: Number(price),
                count: Number(count),
            });
        });

        await Promise.all(promises);
    } catch (error) {
        console.log('Whoops', error);
    }
};
