// /server/db/config.ts
export default {
    username: process.env.NUXT_DB_USER || "postgres",
    password: process.env.NUXT_DB_PASSWORD || "umair8920",
    database: process.env.NUXT_DB_NAME || "mydb",
    host: process.env.NUXT_DB_HOST || "localhost",
    port: Number(process.env.NUXT_DB_PORT) || 5432,
    dialect: "postgres",
  };
  