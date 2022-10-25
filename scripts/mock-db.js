'use strict';

const { DynamoDBClient, BatchWriteItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { createInterface } = require('readline');


const readlineAsync = question => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => readline.question(question, resolve));
};


const createPrice = (max = 100) => Math.floor(Math.random() * max);

const createCount = (max = 10) => Math.floor(Math.random() * max) + 1;

const getFakeProductGenerator = () => {
    let productId = 1;

    return () => ({
        id: productId++,
        title: 'Fejkowy Artykuł',
        description: 'custom description of a product',
        price: createPrice(),
        count: createCount(),
    });
};


(async () => {
    const productsCount = await readlineAsync('products count = ');
    const generateProduct = getFakeProductGenerator();

    const products = [];
    const stock = [];

    for (let i = 0; i < productsCount; i++) {
        const { count, ...product } = generateProduct();
        const { id } = product;

        products.push({
            PutRequest: { Item: marshall(product) },
        });

        stock.push({
            PutRequest: { Item: marshall({ id, count }) },
        });
    }

    const client = new DynamoDBClient({ region: 'eu-west-1' });

    // @todo: add sequential calls for result.UnprocessedItems
    const result = await client.send(new BatchWriteItemCommand({
        RequestItems: {
            products,
            stock,
        },
    }));

    console.log('result =', result);
    console.log('added items = ', JSON.stringify(products));
})();
