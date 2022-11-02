import { APIGatewayEvent } from 'aws-lambda';
import { getProductById } from '../../../shared/resolvers/product';
import {
    getDefaultResponse,
    getInternalError,
    getProductDataNotValidError,
    getProductNotFoundError,
} from '../../../shared/helpers';


export const handler = async (event: APIGatewayEvent) => {
    const id = String(event.pathParameters?.id);

    console.log('[Event] getProductById called with ', { id });

    if (!id) {
        return getProductDataNotValidError();
    }

    try {
        const product = await getProductById(id);

        return product
            ? getDefaultResponse(product)
            : getProductNotFoundError();
    } catch (error) {
        return getInternalError();
    }
};
