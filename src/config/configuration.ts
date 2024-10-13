export const configuration = () => ({
  app: {
    port: parseInt(process.env.APP_PORT || '', 10) || 5000,
    origin: process.env.APP_ORIGIN || 'http://127.0.0.1:5000'
  },
  frontend: {
    origin: process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:3000'
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || ''
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || ''
  }
});
