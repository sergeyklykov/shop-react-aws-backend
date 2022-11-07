import { GetQueueUrlCommand, SendMessageCommand } from '@aws-sdk/client-sqs';
import { client } from '../../queue';


export const sendMessage =
    (queue: string) =>
        (body: any) =>
            client.send(new SendMessageCommand({
                MessageBody: JSON.stringify(body),
                QueueUrl: queue,
            }));

export const getQueueUrl = (queue: string) =>
    client
        .send(new GetQueueUrlCommand({ QueueName: queue }))
        .then(result => result.QueueUrl);
