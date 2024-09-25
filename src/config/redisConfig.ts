import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: 12675
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});

redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch((err: Error) => console.error('Failed to connect to Redis:', err));

export default redisClient;
