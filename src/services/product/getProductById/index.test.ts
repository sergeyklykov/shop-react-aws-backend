import { APIGatewayEvent } from 'aws-lambda';
import { getDefaultResponse, getProductNotFoundError } from '../../../shared/helpers';
import { products } from '../../../mocks/products.mock';
import { getProductById } from '../../../shared/resolvers/product';
import { handler } from './index';

jest.mock('../../../shared/resolvers/product');


describe('getProductById', () => {
    describe('on call with valid id', () => {
        it('should return this product', async () => {
            const [expectedProduct] = products;
            const { id } = expectedProduct!;

            (getProductById as jest.MockedFn<typeof getProductById>).mockResolvedValue(expectedProduct!);

            const event = { pathParameters: { id } } as unknown as APIGatewayEvent;
            const result = await handler(event);
            const expectedResult = getDefaultResponse(expectedProduct);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('on call with invalid id', () => {
        it('should return "product not found" error', async () => {
            const event = {} as unknown as APIGatewayEvent;

            (getProductById as jest.MockedFn<typeof getProductById>).mockResolvedValue(null);

            const result = await handler(event);
            const expectedResult = getProductNotFoundError();

            expect(result).toEqual(expectedResult);
        });
    });
});
