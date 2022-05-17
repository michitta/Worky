// Импорт библиотек и классов
import {Composer, Markup} from "telegraf";
import {College} from "../database/entity/College";

// Создаём новый Компостер (почти модульность бота 🙂)
let composer = new Composer();

// Действие бота на /start
composer.start(async (ctx) => {
    ctx.reply(
        'Здравствуйте! Меня зовут Worky и я помогу Вам с подбором вакансий! Нажмите на кнопку ниже, чтобы продолжить',
        Markup.inlineKeyboard([
            Markup.button.callback('Перейти к выбору вакансий', 'mainMenuButton'),
        ])
    );
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })
    if (!college) {
        await College.create({
            userID: ctx.message.chat.id.toString()
        }).save()
    }
});

// Импорт модуля
module.exports = composer