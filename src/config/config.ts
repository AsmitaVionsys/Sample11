import DotenvFlow from 'dotenv-flow';

DotenvFlow.config();

export default {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    NODE_ENV: process.env.NODE_ENV
};
