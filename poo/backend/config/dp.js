"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("mysql2/promise");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Carregar variáveis de ambiente do .env
var pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.default = pool;
