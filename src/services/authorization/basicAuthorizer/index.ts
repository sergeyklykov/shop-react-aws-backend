const USERNAME = String(process.env.USERNAME);
const PASSWORD = String(process.env.PASSWORD);

const decode = (encoded: string) => Buffer.from(encoded, 'base64').toString();


export const handler = async (event: any) => {
    const { headers } = event;
    const { authorization } = headers;

    const token = authorization.split(' ')[1];
    const credentials = decode(token).split(':');
    const [username, password] = credentials;

    let isAuthorized = false;
    let statusCode = 401;

    if (!username || !password) {
        return {
            isAuthorized,
            statusCode,
        };
    }

    isAuthorized = username === USERNAME && password === PASSWORD;
    statusCode = isAuthorized ? 200 : 403;

    return {
        isAuthorized,
        statusCode,
    };
};
