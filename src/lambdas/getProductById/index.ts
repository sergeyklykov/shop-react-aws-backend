import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse, getInternalError } from '../../helpers';
import { getItem } from '../../resolvers';


export const handler = async (event: APIGatewayEvent) => {
    const { pathParameters } = event;
    const id = Number(pathParameters?.id);

    console.log('[Event] getProductById called with ', { id });

    try {
        const product = await getItem('products', { id });
        const stock = await getItem('stock', { id });

        if (!product || !stock) {
            return formatResponse({
                statusCode: 404,
                body: { error: 'product not found' },
            });
        }

        return formatResponse({
            body: {
                ...product,
                ...stock,
            },
        });
    } catch (error) {
        console.error('[Error] getProductById failed due to ', error);

        return getInternalError();
    }
};
