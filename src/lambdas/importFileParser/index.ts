import { APIGatewayEvent } from 'aws-lambda';
import { getDefaultResponse } from '../../helpers';


export const handler = async (event: APIGatewayEvent) => {
    return getDefaultResponse({
        error: 'Not implemented yet'
    });
}
