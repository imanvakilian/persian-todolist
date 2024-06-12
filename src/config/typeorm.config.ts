import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function initTypeOrm(): TypeOrmModuleOptions {
    const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;
    return {
        type: "postgres",
        username: DB_USERNAME,
        password: DB_PASSWORD,
        port: DB_PORT,
        host: DB_HOST,
        database: DB_DATABASE,
        synchronize: true,
        entities: [
            "dist/**/**/**/*.entity{.ts,.js}",
            "dist/**/**/*.entity{.ts,.js}",
        ]
    }
}