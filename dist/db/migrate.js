"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
function migration_up(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = args.migration.slice(0, args.migration.length - 3);
        try {
            const { up } = require(`./${filename}`);
            yield up();
            console.log("The tables was success created!");
        }
        catch (error) {
            console.log(`[Error] ${error}`);
        }
    });
}
function migration_down(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = args.migration.slice(0, args.migration.length - 3);
        try {
            const { down } = require(`./${filename}`);
            yield down();
            console.log("The tables was success deleted!");
        }
        catch (error) {
            console.log(`[Error] ${error}`);
        }
    });
}
const argv = (0, yargs_1.default)(process.argv.slice(2))
    .command('migration:up', 'Создает таблицы из файла миграции', (yargs) => {
    yargs.option('migration', {
        alias: 'migration',
        describe: 'The migration file name',
        type: 'string',
        demandOption: true,
    });
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    yield migration_up(args);
}))
    .command('migration:down', 'Удаляет таблицы из файла миграций', (yargs) => {
    yargs.option('migration', {
        alias: 'migration',
        describe: 'The migration file name',
        type: 'string',
        demandOption: true,
    });
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    yield migration_down(args);
}))
    .help()
    .alias('help', 'h')
    .argv;
//# sourceMappingURL=migrate.js.map