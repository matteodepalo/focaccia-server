const parse = require('pg-connection-string').parse;
const env = require('dotenv')
env.config()

const config = process.env.DATABASE_URL ? parse(process.env.DATABASE_URL) : {}

const pgConnection  = {
  type: "postgres",
  host: config.host || 'localhost',
  port: config.port || 5432,
  username: config.user || 'postgres',
  password: config.password || 'pw',
  database: config.database || 'focaccia_development',
  synchronize: process.env.DATABASE_URL ? false : true,
  dropSchema: false,
  logging: true,
  entities: ['/src/**/*.entity.ts', 'dist/**/*.entity.js'],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: "migrations"
  },
  ssl: process.env.DATABASE_URL ? true : false,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

module.exports = pgConnection;