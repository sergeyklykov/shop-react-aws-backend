'use strict';

const { formatResponse } = require('../../helpers');
const productsMock = require('../../mocks/products.mock');


exports.handler = async (event) => {
    const { pathParameters } = event;
    const { id } = pathParameters;

    const result = productsMock.find(product => product.id === id);

    if (!result) {
        return formatResponse({
            body: { error: 'product not found' },
            statusCode: 404,
        });
    }

    return formatResponse({ body: result });
};
