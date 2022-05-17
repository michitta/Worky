// Импорт библиотек Telegraf и axios
import {Telegraf} from "telegraf";
import {createConnection} from "typeorm";

// Импорт таблицы College
import {College} from "./database/entity/College";

// Импорт конфига
const config = require("./config.json")

// Создание бота и назначение токена
export let bot = new Telegraf(config.token);

// Подключаемся к базе данных
(async () => {
    await createConnection({
        entities: [College],
        "type": "mysql",
        "host": config.ip,
        "username": "bot",
        "password": config.pass,
        "port": 3306,
        "database": "selestiadb",
        "synchronize": true,
        "logging": false,
    })
})()

// Подключение компостеров (почти модульность бота 🙂)
bot.use(require('./composers/start.composer'))
bot.use(require('./composers/actions.composer'))
bot.use(require('./composers/hears.composer'))

// Выполняем запуск бота и после запуска пишем в консоль "Бот запущен!" (Переведенно специально для Вас 😘)
bot.launch().then(() => console.log("Bot started!"))