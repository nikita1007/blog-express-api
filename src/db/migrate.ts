import yargs from 'yargs';


async function migration_up(args: any): Promise<void> {
  const filename: string = args.migration.slice(0, args.migration.length-3);
  
  try {
    const { up } = require(`./${filename}`);
    await up();
  
    console.log("The tables was success created!");
  } catch (error) {
    console.log(`[Error] ${error}`);
  }
}

async function migration_down(args: any): Promise<void> {
  const filename: string = args.migration.slice(0, args.migration.length-3);
  
  try {
    const { down } = require(`./${filename}`);
    await down();

    console.log("The tables was success deleted!");
  } catch (error) {
    console.log(`[Error] ${error}`);
  }
}

const argv = yargs(process.argv.slice(2))
  .command('migration:up', 'Создает таблицы из файла миграции', (yargs) => {
    yargs.option('migration', {
      alias: 'migration',
      describe: 'The migration file name',
      type: 'string',
      demandOption: true,
    });
  }, async (args) => {
    await migration_up(args);
  })
  .command('migration:down', 'Удаляет таблицы из файла миграций', (yargs) => {
    yargs.option('migration', {
      alias: 'migration',
      describe: 'The migration file name',
      type: 'string',
      demandOption: true,
    });
  }, async (args) => {
    await migration_down(args);
  })
  .help()
  .alias('help', 'h')
  .argv;