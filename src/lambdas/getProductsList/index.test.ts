import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse } from '../../helpers';
import { products } from '../../mocks/products.mock';
import { handler } from './index';


describe('getProductsList', () => {
    describe('on call', () => {
        it('should return list of products', async () => {
            const event = {} as unknown as APIGatewayEvent;
            const result = await handler(event);
            const expectedResult = formatResponse({ body: products });

            expect(result).toEqual(expectedResult);
        });
    });
});
