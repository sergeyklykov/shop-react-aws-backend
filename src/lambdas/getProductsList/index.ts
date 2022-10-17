import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse } from '../../helpers';
import { products } from '../../mocks/products.mock';


export const handler = async (event: APIGatewayEvent) => {
    const result = [...products];

    return formatResponse({ body: result });
};
