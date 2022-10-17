import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse, getInternalError } from '../../helpers';
import { getItems } from '../../resolvers';


const getStockById = (stock: any[] = [], id: number) => stock.find(item => item.id === id);


export const handler = async (event: APIGatewayEvent) => {
    console.log('[Event] getProductList called');

    try {
        const [products, stock] = await Promise.all([
            getItems('products'),
            getItems('stock')
        ]);

        return formatResponse({
            body: products.map(product => ({
                ...product,
                count: getStockById(stock, product.id),
            })),
        });
    } catch (error) {
        console.error('[Error] getProductList failed due to ', error);

        return getInternalError();
    }
};
