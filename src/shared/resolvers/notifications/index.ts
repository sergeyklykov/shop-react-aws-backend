import { PublishCommand, SetTopicAttributesCommand } from '@aws-sdk/client-sns';
import { client } from '../../notifications';


export const setAttribute =
    (topic: string) =>
        (name: string, value: string) =>
            client.send(new SetTopicAttributesCommand({
                TopicArn: topic,
                AttributeName: name,
                AttributeValue: value,
            }));

export const publish =
    (topic: string) =>
        (message: string) =>
            client.send(new PublishCommand({
                Message: message,
                TopicArn: topic,
            }));
