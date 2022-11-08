import { SQSHandler } from 'aws-lambda';
import { generateProductId } from '../../../shared/helpers/product';
import { publish, setAttribute } from '../../../shared/resolvers/notifications';
import { createProduct } from '../../../shared/resolvers/product';


const TOPIC = String(process.env.PRODUCTS_NOTIFICATION_TOPIC);

const publishToProductsTopic = publish(TOPIC);
const setAttributeToProductsTopic = setAttribute(TOPIC);

const publishSuccess = async (message: string) => {
    await setAttributeToProductsTopic('import', 'success');
    await publishToProductsTopic(message);
}

const publishFail = async (message: string) => {
    await setAttributeToProductsTopic('import', 'fail');
    await publishToProductsTopic(message);
};

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
        await publishSuccess('products imported');
    } catch (error) {
        console.log('Whoops', error);
        await publishFail('products not imported');
    }
};
