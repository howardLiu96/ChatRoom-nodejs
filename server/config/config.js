var config = require('./config.json');
var envConfig = config["dev"];

Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
});