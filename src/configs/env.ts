import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production'])
    .default('development')
    .optional(),
  PORT: z.string().transform(Number).pipe(z.number().positive()).default(4000),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default(5432),
  DB_NAME: z.string().default('db_name'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  parsed.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
