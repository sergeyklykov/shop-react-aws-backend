export const formatResponse = ({
    body,
    statusCode = 200,
    headers = {},
}: {
    body: any,
    statusCode?: number,
    headers?: { [k: string]: string },
}) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*',
    },
});
