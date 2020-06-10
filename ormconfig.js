const parse = require('pg-connection-string').parse;
const env = require('dotenv')
env.config()

const isProd = process.env.NODE_ENV === 'production'
const config = typeof process.env.DATABASE_URL !== 'undefined' ? parse(process.env.DATABASE_URL) : {}

const pgConnection  = {
  type: "postgres",
  host: config.host || 'localhost',
  port: config.port || 5432,
  username: config.user || 'postgres',
  password: config.password || 'pw',
  database: config.database || 'focaccia_development',
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: "src/migrations"
  },
  ssl: isProd
}

if (isProd) {
  Object.assign(pgConnection, {
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  })
}

module.exports = pgConnection;