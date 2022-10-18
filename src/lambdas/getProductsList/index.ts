import { formatResponse, getInternalError } from '../../helpers';
import { getProductList } from '../../resolvers/product';


export const handler = async () => {
    console.log('[Event] getProductList called');

    try {
        const products = await getProductList();

        return formatResponse({
            body: products,
        });
    } catch (error) {
        console.error('[Error] getProductList failed due to', error);

        return getInternalError();
    }
};
