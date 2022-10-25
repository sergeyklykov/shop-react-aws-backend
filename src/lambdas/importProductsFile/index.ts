import { APIGatewayEvent } from 'aws-lambda';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getInternalError, getDefaultResponse } from '../../helpers/index';
import { client } from '../../storage';


const BUCKET_UPLOADS = 'aws-shop-be-import-service-uploads';


export const handler = async (event: APIGatewayEvent) => {
    const name = event.pathParameters?.name;

    if (!name) {
        return getInternalError();
    }

    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET_UPLOADS,
            Key: `uploads/${name}`,
        });

        const url = await getSignedUrl(client, command, { expiresIn: 3600 });

        return getDefaultResponse({ url });
    } catch (error) {
        console.log('upload', error);

        return getInternalError();
    }
}
