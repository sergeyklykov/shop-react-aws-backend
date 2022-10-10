'use strict';

const productsMock = require('../../mocks/products.mock');


exports.handler = async (event) => {
    const { pathParameters } = event;
    const { id } = pathParameters;

    const result = productsMock.find(product => product.id === id);

    if (!result) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'product not found' }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};
