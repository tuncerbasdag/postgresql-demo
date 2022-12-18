const redis = require('redis');
const config = require('../config');

module.exports = new (class Redis {
  constructor() {
    if (!this._client) {
      this.init();
    }

    this._client.on('error', (err) => {
      console.log('Error ' + err);
    });

    this._client.on('ready', () => {
      console.log('Connected!');
    });
  }

  init() {
    this._client = redis.createClient({
      host: config.redis.host,
      port: config.redis.port
    });
    this._client.connect();
  }

  async get(key) {
    const data = await this._client.get(key);

    if (data) {
      return JSON.parse(data);
    }
  }

  async set(key, value) {
    const cacheValue = JSON.stringify(value);
    return await this._client.set(key, cacheValue, 60);
  }
})();
