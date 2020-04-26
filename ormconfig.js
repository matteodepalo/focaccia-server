const parse = require('pg-connection-string').parse;
const env = require('dotenv')
env.config()

const config = process.env.DATABASE_URL ? parse(process.env.DATABASE_URL) : {}

const pgConnection  = {
  type: "postgres",
  host: config.host,
  port: config.port,
  username: config.user || 'postgres',
  password: config.password || 'pw',
  database: config.database || 'focaccia_development',
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ['/src/**/*.entity.ts', 'dist/**/*.entity.js'],
  extra: {
    ssl: process.env.DATABASE_URL ? true : false,
  }
}

module.exports = pgConnection;