import { S3CreateEvent } from 'aws-lambda';
import { getDefaultResponse, getInternalError, parseCsvStream } from '../../../shared/helpers';
import { copy, get, remove } from '../../../shared/resolvers/storage';


const BUCKET = 'aws-shop-be-import-service-uploads';

const getBucketObject = get(BUCKET);
const copyBucketObject = copy(BUCKET);
const removeBucketObject = remove(BUCKET);


export const handler = async (event: S3CreateEvent) => {
    try {
        const key = event.Records[0]?.s3.object.key;

        console.log('key = ', key);

        if (!key) {
            throw new Error('error extracting file name');
        }

        const [_, fileName] = key.split('/');

        console.log('file name = ', fileName);

        const response = await getBucketObject(key);
        const { Body } = response;

        console.log('get bucket response received', response);

        const result = await parseCsvStream(Body);

        console.log('csv parsed', result);

        await copyBucketObject(`${BUCKET}/${key}`, `parsed/${fileName}`);

        console.log('copied');

        await removeBucketObject(key);

        console.log('removed');

        return getDefaultResponse({ result });
    } catch (error) {
        console.log('importFileParser ::: ', error);
        return getInternalError();
    }
}
