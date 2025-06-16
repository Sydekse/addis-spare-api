import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
  trustedOrigins: [process.env?.FRONTEND_URL || 'http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
  },
  database: new Pool({
    connectionString: process.env?.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/addis_spare',
  }),
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env?.CLIENT_ID || 'valid client id',
      clientSecret: process.env?.CLIENT_SECRET || 'valid client secret',
    },
  },
});
