namespace  NodeJS {
    interface ProcessEnv {
        // app
        PORT: number;
        // database
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_DATABASE: string;
        // secret
        COOKIE_SECRET: string;
        COOKIE_NAME_REGISTER: string;
        JWT_REGISTER_SECRET: string;
        JWT_ACCESS_SECRET: string;
    }
}