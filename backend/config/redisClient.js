const redis = require('redis');

const redisClient = redis.createClient({
    
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => {
    console.warn(`Redis Cache Error: ${err.message}. Ensure Redis is running on port 6379 for caching to work.`);
});

redisClient.on('connect', () => {
    console.log('Redis connected successfully. Caching is now ACTIVE.');
});


redisClient.connect().catch((err) => {
    console.warn('Initial Redis connection failed. App will bypass cache and fallback to MongoDB.');
});

module.exports = redisClient;
