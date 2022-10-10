'use strict';

const productsMock = require('../../mocks/products.mock');


exports.handler = async (event) => {
    const result = [...productsMock];

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};
