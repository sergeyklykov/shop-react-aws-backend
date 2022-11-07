import { getDefaultResponse, getInternalError } from '../../../shared/helpers';
import { getProductList } from '../../../shared/resolvers/product';


export const handler = async () => {
    console.log('[Event] getProductList called');

    try {
        const products = await getProductList();

        return getDefaultResponse(products);
    } catch (error) {
        return getInternalError();
    }
};
