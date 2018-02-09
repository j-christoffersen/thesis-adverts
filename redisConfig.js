let redisUrl;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev-docker' || process.env.NODE_ENV === 'dev-load' || process.env.NODE_ENV === 'prod-load') {
  redisUrl = 'redis://127.0.0.1:6379';
} else {
  redisUrl = 'redis://redis:6379';
}

module.exports = { redisUrl };
