// Импорт библиотек и классов
import {Composer, Markup} from "telegraf";
import {bot} from "../index";
import {College} from "../database/entity/College";
import axios from "axios";

// Создаём новый Компостер (почти модульность бота 🙂)
let composer = new Composer();

// Массивы входящих данных
let Schedutels = ["C", "C#", "C++", "Java", "1C", "SQL", "Python", "Вернуться к выбору графика"]
let Graphic = ["Полный день", "Сменный график", "Гибкий график", "Вернуться к выбору графика", "Вернуться к выбору типа занятости"]
let zarPlata = ['Полная занятость', 'Частичная занятость', 'Стажировка', 'Проектная работа', 'Вернуться к выбору зарплаты']
let experience = ['Не имеет значения', 'от 120000 руб', 'от 215000 руб', 'от 310000 руб', 'от 405000 руб', 'от 500000 руб', 'Указан доход']
let answers = ['Нет опыта', 'От 1-3 лет', 'От 3-6 лет', 'Больше 6 лет', 'C', 'C#']
let inProgress = ['😎 Инженер', '☸ Электроснабжение', '📞 Админстратор баз данных', '📢 Специалист по телекомуникациям', '⭐️ Техник по комп.сетям', '👥 Share'];

//Команды в прогрессе разработки
bot.hears(inProgress, async ctx => ctx.reply('Данное меню ещё в разработке.'))

// Выбор профессии
bot.hears('Вернуться к выбору профессий', async ctx =>{
    await ctx.reply("Выберите профессию", Markup
        .keyboard([
            ['🔍 Программист', '😎 Инженер'],
            ['☸ Электроснабжение', '📞 Админстратор баз данных'],
            ['📢 Специалист по телекомуникациям', '⭐️ Техник по комп.сетям', '👥 Share']
        ])
        .oneTime()
        .resize()
    )
    return;
})

// Языки программирования
bot.hears(['🔍 Программист', 'Вернуться к выбору языка'], async ctx =>{
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })
    if (ctx.message.text != "Вернуться к выбору языка"){
        college.proffesion = ctx.message.text; await college.save();
    }
    return await ctx.reply("Выберите язык программирования", Markup
        .keyboard([
            ['C', 'C#', 'C++'],
            ['Java', '1C', 'SQL', 'Python'],
            ['Вернуться к выбору профессий']
        ])
        .oneTime()
        .resize()
    )
})

// График работы
bot.hears(Schedutels, async ctx =>{
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })
    if (ctx.message.text != "Вернуться к выбору графика"){
        college.launguage = ctx.message.text; await college.save();
    }
    return await ctx.reply("Выберите график работы", Markup
        .keyboard([
            ['Полный день', 'Сменный график'],
            ['Удалённая работа', 'Гибкий график'],
            ['Вернуться к выбору языка']
        ])
        .oneTime()
        .resize()
    )
})

// Выбор типа занятости
bot.hears(Graphic, async ctx =>{
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })
    if (ctx.message.text != "Вернуться к выбору типа занятости"){
        college.grafRabot = ctx.message.text; await college.save();
    }
    await ctx.reply("Выберите тип занятости", Markup
        .keyboard([
            ['Полная занятость', 'Частичная занятость'],
            ['Стажировка', 'Проектная работа'],
            ['Вернуться к выбору графика']
        ])
        .oneTime()
        .resize()
    )
    return;
})

// Заработная плата
bot.hears(zarPlata, async ctx =>{
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })
    if (ctx.message.text != "Вернуться к выбору зарплаты"){
        college.typeZanatosti = ctx.message.text; await college.save();
    }
    return await ctx.reply("Выберите желаемую заработную плату", Markup
        .keyboard([
            ['Не имеет значения'],
            ['от 120000 руб', 'от 215000 руб', 'от 310000 руб'],
            ['от 405000 руб', 'от 500000 руб', 'Указан доход'],
            ['Вернуться к выбору типа занятости']
        ])
        .oneTime()
        .resize()
    )
})

// Опыт работы
bot.hears(experience, async ctx =>{
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })
    if (ctx.message.text != "Вернуться к выбору зарплаты") {
        college.zarPlata = ctx.message.text; await college.save();
    }
    return await ctx.reply("Выберите опыт работы", Markup
        .keyboard([
            ['Нет опыта', 'От 1-3 лет'],
            ['От 3-6 лет', 'Больше 6 лет'],
            ['Вернуться к выбору зарплаты']
        ])
        .oneTime()
        .resize()
    )
})

// Последний запрос ответа
bot.hears(answers, async ctx =>{

    // Поиск пользователя в базе данных
    let college = await College.findOne({ where: {userID: ctx.message.chat.id.toString()} })

    // Запись последнего ответа в базу данных
    college.exp = ctx.message.text; await college.save();

    // Более правильный способ запроса в отличии от старой версии

    let text = "";
    let schedule = "";
    let employment = "";
    let experience = "";

    // Выбор профессии
    if (college.proffesion.concat("Программист")) text = "Программист";

    // Выбор языка
    switch (college.launguage){
        case "C":
            text += ` C`
            break;
        case "C#":
            text += ` C#`
            break;
        case "C++":
            text += ` C++`
            break;
        case "Java":
            text += ` Java"`
            break;
        case "1C":
            text += ` 1C"`
            break;
        case "SQL":
            text += ` SQL"`
            break;
        case "Python":
            text += ` Python"`
            break;
    }

    // График работ
    switch (college.grafRabot){
        case "Полный день":
            schedule += `fullDay`
            break;
        case "Сменный график":
            schedule += `shift`
            break;
        case "Удалённая работа":
            schedule += `remote`
            break;
        case "Гибкий график":
            schedule += `flexible`
            break;
    }

    // Выбор занятости
    switch (college.typeZanatosti){
        case "Полная занятость":
            employment += `full`
            break;
        case "Частичная занятость":
            employment += `part`
            break;
        case "Стажировка":
            employment += `probation`
            break;
        case "Проектная работа":
            employment += `project`
            break;
    }

    // Выбор опыта работы
    switch (college.exp){
        case "Нет опыта":
            experience += `noExperience`
            break;
        case "От 1-3 лет":
            experience += `between1And3`
            break;
        case "От 3-6 лет":
            experience += `between3And6`
            break;
        case "Больше 6 лет":
            experience += `moreThan6`
            break;
    }

    // Запрос из базы данных
    axios({
        method: 'get',
        url: 'https://api.hh.ru/vacancies',
        params: {
            text: text,
            schedule: schedule,
            employment: employment,
            experience: experience,
            per_page: '10'
        }
    }).then(x => {
        for (let item of x.data.items){
            ctx.reply("Отправляю Вам подходящие вакансии")
            ctx.reply(item.name + "\n" + item.alternate_url)
        }
    });
})

// Импорт модуля
module.exports = composer