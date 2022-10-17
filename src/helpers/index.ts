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

export const getProductDataNotValidError = () => formatResponse({
    statusCode: 400,
    body: { error: 'product data is not valid' },
});

export const getInternalError = () => formatResponse({
    statusCode: 500,
    body: { error: 'internal error' },
});
