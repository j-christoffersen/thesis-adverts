let redisUrl;

if (['development', 'dev-docker', 'dev-load', 'prod-load'].includes(process.env.NODE_ENV)) {
  redisUrl = 'redis://127.0.0.1:6379';
} else {
  redisUrl = 'redis://redis:6379';
}

module.exports = { redisUrl };
