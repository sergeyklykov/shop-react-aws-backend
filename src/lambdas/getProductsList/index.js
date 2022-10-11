'use strict';

const { formatResponse } = require('../../helpers');
const productsMock = require('../../mocks/products.mock');


exports.handler = async (event) => {
    const result = [...productsMock];

    return formatResponse({ body: result });
};
