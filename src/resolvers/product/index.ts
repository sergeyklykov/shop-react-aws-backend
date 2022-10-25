import { ScanCommand, TransactGetItemsCommand, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { client } from '../../db';


const getStockById = (stock: any[] = [], id: string) => stock.find(item => item.id === id).count;


export const getProductById = async (id: string) => {
    const command = new TransactGetItemsCommand({
        TransactItems: [
            {
                Get: {
                    Key: marshall({ id }),
                    TableName: 'products',
                }
            },
            {
                Get: {
                    Key: marshall({ id }),
                    TableName: 'stock',
                }
            }
        ]
    });

    const response = await client.send(command);

    const { Responses = [] } = response;
    const product = Responses[0]?.Item;
    const stock = Responses[1]?.Item;

    if (!product || !stock) {
        return null;
    }

    return {
        ...unmarshall(product),
        ...unmarshall(stock),
    };
};

export const getProductList = async () => {
    const [
        { Items: productList = [] },
        { Items: stockList = [] }
    ] = await Promise.all([
        client.send(new ScanCommand({ TableName: 'products' })),
        client.send(new ScanCommand({ TableName: 'stock' }))
    ]);

    const products = productList.map(product => unmarshall(product));
    const stock = stockList.map(stock => unmarshall(stock));

    return products.map((product: any) => ({
        ...product,
        count: getStockById(stock, product.id),
    }));
};

export const createProduct = async (productWithStock: { [k: string]: any }) => {
    const { id, count, ...props } = productWithStock;

    const stock = { id, count };
    const product = { id, ...props };

    const command = new TransactWriteItemsCommand({
        TransactItems: [
            {
                Put: {
                    Item: marshall(product),
                    TableName: 'products',
                }
            },
            {
                Put: {
                    Item: marshall(stock),
                    TableName: 'stock',
                }
            }
        ]
    });

    return client
        .send(command)
        .then(() => id);
};
