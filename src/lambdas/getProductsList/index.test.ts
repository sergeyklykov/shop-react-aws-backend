import { formatResponse } from '../../helpers';
import { products } from '../../mocks/products.mock';
import { getProductList } from '../../resolvers/product';
import { handler } from './index';

jest.mock('../../resolvers/product');


describe('getProductsList', () => {
    describe('on call', () => {
        it('should return list of products', async () => {
            (getProductList as jest.MockedFn<typeof getProductList>).mockResolvedValue(products);

            const result = await handler();
            const expectedResult = formatResponse({ body: products });

            expect(result).toEqual(expectedResult);
        });
    });
});
