import { APIGatewayEvent } from 'aws-lambda';
import { createProduct } from '../../resolvers/product';
import { isProduct, generateProductId } from '../../helpers/product';
import {
    getDefaultResponse,
    getInternalError,
    getProductDataNotValidError,
    parseBodyToJson,
} from '../../helpers';


export const handler = async (event: APIGatewayEvent) => {
    console.log('[Event] createProduct called with ', event.body);

    if (!event.body) {
        return getProductDataNotValidError();
    }

    try {
        const id = generateProductId();
        const props = parseBodyToJson(event.body);
        const product = { id, ...props };

        if (!isProduct(product)) {
            getProductDataNotValidError();
        }

        const result = await createProduct(product);

        return getDefaultResponse(result);
    } catch (error) {
        return getInternalError();
    }
};
