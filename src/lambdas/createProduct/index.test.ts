import { APIGatewayEvent } from 'aws-lambda';
import { formatResponse, getInternalError, getProductDataNotValidError } from '../../helpers';
import { products } from '../../mocks/products.mock';
import { createProduct } from '../../resolvers/product';
import { handler } from './index';

jest.mock('../../resolvers/product');


describe('createProduct', () => {
    describe('on call with valid data', () => {
        it('should return 200', async () => {
            const [expectedProduct] = products;
            const { id } = expectedProduct!;

            (createProduct as jest.MockedFn<typeof createProduct>).mockResolvedValue(id);

            const validBody = 'title=ttl&description=desc&price=1&count=5';
            const event = { body: validBody } as unknown as APIGatewayEvent;
            const result = await handler(event);
            const expectedResult = formatResponse({ body: id });

            expect(result).toEqual(expectedResult);
        });
    });

    describe('on call with invalid data', () => {
        it('should return "product data not valid" error', async () => {
            const event = { body: null } as unknown as APIGatewayEvent;

            const result = await handler(event);
            const expectedResult = getProductDataNotValidError();

            expect(result).toEqual(expectedResult);
        });
    });

    describe('on internal error', () => {
        it('should return "internal error" error', async () => {
            const validBody = 'title=ttl&description=desc&price=1&count=5';
            const event = { body: validBody } as unknown as APIGatewayEvent;

            (createProduct as jest.MockedFn<typeof createProduct>).mockRejectedValue(null);

            const result = await handler(event);
            const expectedResult = getInternalError();

            expect(result).toEqual(expectedResult);
        });
    })
});
