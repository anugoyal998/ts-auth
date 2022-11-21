import dotenv from 'dotenv';
dotenv.config()

type IEnv = {
    APP_PORT: string | number;
    DEBUG_MODE: string;
    DB_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
}

const envConfig: IEnv = {
    APP_PORT: process.env.PORT || 5000,
    DEBUG_MODE: process.env.DEBUG_MODE || '',
    DB_URL: process.env.DB_URL || '',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || ''
}

export default envConfig