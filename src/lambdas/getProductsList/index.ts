import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse } from '../../helpers';
import { getItems } from '../../resolvers';


const getStockById = (stock: any[] = [], id: number) => stock.find(item => item.id === id);


export const handler = async (event: APIGatewayEvent) => {
    const products = await getItems('products');
    const stock = await getItems('stock');

    return formatResponse({
        body: products.map(product => ({
            ...product,
            count: getStockById(stock, product.id),
        })),
    });
};
