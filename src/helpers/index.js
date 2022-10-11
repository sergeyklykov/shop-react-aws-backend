const formatResponse = ({ body, statusCode = 200, headers = {} }) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*',
    },
});


module.exports = {
    formatResponse,
};
