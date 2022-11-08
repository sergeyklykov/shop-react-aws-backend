import { PublishCommand } from '@aws-sdk/client-sns';
import { client } from '../../notifications';


export const publish = (topic: string) => (message: string) => client.send(new PublishCommand({
    Message: message,
    TopicArn: topic,
}));
