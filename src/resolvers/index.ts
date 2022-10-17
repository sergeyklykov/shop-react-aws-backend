import { GetItemCommand, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { client } from '../db';


export const getItem = (table: string, criteria = {}) =>
    client
        .send(new GetItemCommand({ TableName: table, Key: marshall(criteria) }))
        .then(({ Item }) => Item ? unmarshall(Item) : null);

export const getItems = (table: string) =>
    client
        .send(new ScanCommand({ TableName: table }))
        .then(({ Items }) => Items ?? [])
        .then(items => items.map(item => unmarshall(item)));

export const addItem = (table: string, criteria = {}) =>
    client
        .send(new PutItemCommand({ TableName: table, Item: marshall(criteria) }))
