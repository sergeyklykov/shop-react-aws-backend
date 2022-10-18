import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse, getInternalError, getProductDataNotValidError } from '../../helpers';
import { getProductById } from '../../resolvers/product';


export const handler = async (event: APIGatewayEvent) => {
    const id = String(event.pathParameters?.id);

    console.log('[Event] getProductById called with ', { id });

    if (!id) {
        return getProductDataNotValidError();
    }

    try {
        const product = await getProductById(id);

        if (!product) {
            return formatResponse({
                statusCode: 404,
                body: { error: 'product not found' },
            });
        }

        return formatResponse({ body: product });
    } catch (error) {
        console.error('[Error] getProductById failed due to ', error);

        return getInternalError();
    }
};
