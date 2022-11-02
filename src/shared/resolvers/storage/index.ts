import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { client } from '../../storage';


export const copy =
    (bucket: string) =>
        (from: string, to: string) =>
            client.send(new CopyObjectCommand({
                Bucket: bucket,
                CopySource: from,
                Key: to,
            }));

export const get =
    (bucket: string) =>
        (key: string) =>
            client.send(new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            }));

export const getUploadUrl =
    (bucket: string) =>
        (key: string) =>
            getSignedUrl(client, new PutObjectCommand({
                Bucket: bucket,
                Key: key,
            }));

export const remove =
    (bucket: string) =>
        (key: string) =>
            client.send(new DeleteObjectCommand({
                Bucket: bucket,
                Key: key,
            }));
