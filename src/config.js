export const MONGODB_URI= 
process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/aerolineaEtereaDB?authSource=admin';

export const PORT = process.env.PORT || 4000;

export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'tokenSecret123'; 