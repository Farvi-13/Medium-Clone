import ormconfig from '@app/ormconfig'

const ormseedconfig = {
    ...ormconfig,
    migrations: [__dirname + '/seed/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/seeds',
    }
};

export default ormseedconfig;
