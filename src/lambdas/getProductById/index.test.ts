import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse } from '../../helpers';
import { products } from '../../mocks/products.mock';
import { getProductById } from '../../resolvers/product';
import { handler } from './index';

jest.mock('../../resolvers/product');


describe('getProductById', () => {
    describe('on call with valid id', () => {
        it('should return this product', async () => {
            const [expectedProduct] = products;
            const { id } = expectedProduct!;

            (getProductById as jest.MockedFn<typeof getProductById>).mockResolvedValue(expectedProduct!);

            const event = { pathParameters: { id } } as unknown as APIGatewayEvent;
            const result = await handler(event);
            const expectedResult = formatResponse({ body: expectedProduct });

            expect(result).toEqual(expectedResult);
        });
    });

    describe('on call with invalid id', () => {
        it('should return "product not found" error', async () => {
            const event = {} as unknown as APIGatewayEvent;

            (getProductById as jest.MockedFn<typeof getProductById>).mockResolvedValue(null);

            const result = await handler(event);
            const expectedResult = formatResponse({ body: { error: 'product not found' }, statusCode: 404 });

            expect(result).toEqual(expectedResult);
        });
    });
});
