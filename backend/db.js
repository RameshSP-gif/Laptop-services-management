const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'ballast.proxy.rlwy.net',
  user: 'root',
  password: 'WjJmOBrxBYatyqzmPKEgtWUKLlfjfXNR',
  database: 'laptop_service',
  port: 25822,
});

module.exports = db;
