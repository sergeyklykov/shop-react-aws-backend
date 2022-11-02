import { APIGatewayEvent } from 'aws-lambda';
import { getUploadUrl } from '../../../shared/resolvers/storage';
import { getInternalError, getDefaultResponse } from '../../../shared/helpers/index';


const BUCKET = 'aws-shop-be-import-service-uploads';

const getBucketUploadUrl = getUploadUrl(BUCKET);


export const handler = async (event: APIGatewayEvent) => {
    try {
        const name = event.queryStringParameters?.name;

        if (!name) {
            throw new Error('invalid parameters');
        }

        const url = await getBucketUploadUrl(`uploads/${name}`);

        return getDefaultResponse({ url });
    } catch (error) {
        console.log('upload', error);

        return getInternalError();
    }
}
