import { S3CreateEvent } from 'aws-lambda';
import csv from 'csv-parser';

import { getDefaultResponse, getInternalError } from '../../../shared/helpers';
import { sendMessage } from '../../../shared/resolvers/queue';
import { copy, get, remove } from '../../../shared/resolvers/storage';


const BUCKET = 'aws-shop-be-import-service-uploads';
const QUEUE = process.env.PRODUCTS_QUEUE_URL;

const getBucketObject = get(BUCKET);
const copyBucketObject = copy(BUCKET);
const removeBucketObject = remove(BUCKET);
const sendMessageToQueue = sendMessage(QUEUE!);


export const handler = async (event: S3CreateEvent) => {
    try {
        const key = event.Records[0]?.s3.object.key;

        if (!key) {
            throw new Error('error extracting file name');
        }

        const [_, fileName] = key.split('/');
        const response = await getBucketObject(key);
        const { Body } = response;

        const result = await new Promise((resolve, reject) =>
            Body
                .pipe(csv())
                .on('data', sendMessageToQueue)
                .on('end', resolve)
                .on('error', reject));

        await copyBucketObject(`${BUCKET}/${key}`, `parsed/${fileName}`);
        await removeBucketObject(key);

        return getDefaultResponse({ result });
    } catch (error) {
        console.log('importFileParser ::: ', error);
        return getInternalError();
    }
}
