import { z } from 'zod';

export const envSchema = z
  .object({
    APP_PORT: z.coerce.number().optional().default(3333),
    APP_NAME: z.coerce.string().optional().default('nestjs-api-restful'),
    DATABASE_HOST: z.string().optional().default('127.0.0.1'),
    DATABASE_PORT: z.coerce.number().optional().default(5432),
    DATABASE_USER: z.string().optional().default('postgres'),
    DATABASE_PASS: z.string().optional().default('docker'),
    DATABASE_NAME: z.string().optional().default('app'),
    JWT_SECRET_KEY: z.string(),
    JWT_PUBLIC_KEY: z.string(),
  })
  .transform((env) => {
    const databaseUrl = `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASS}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}?schema=public`;

    return {
      ...env,
      DATABASE_URL: databaseUrl,
    };
  });

export type Env = z.infer<typeof envSchema>;
