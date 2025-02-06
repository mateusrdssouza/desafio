export const jwtConstants = {
  secret: process.env.SECRET_KEY || 'secretKey',
  expires: process.env.EXPIRES_IN || '60s',
};
