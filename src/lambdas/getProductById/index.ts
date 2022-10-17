import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse } from '../../helpers';
import { products } from '../../mocks/products.mock';


export const handler = async (event: APIGatewayEvent) => {
    const { pathParameters } = event;
    const { id } = pathParameters ?? {};

    const result = products.find(product => product.id === id);

    if (!result) {
        return formatResponse({
            statusCode: 404,
            body: { error: 'product not found' },
        });
    }

    return formatResponse({ body: result });
};
