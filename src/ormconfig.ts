import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'viaduct.proxy.rlwy.net',
    port: 38748,
    username: 'postgres',
    password: '2442e2FFdD31cCgb-3CfA-24-5C4Eaec',
    database: 'railway',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    name: 'default',
    // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: 'src/migrations'
    // },
};

export default config;