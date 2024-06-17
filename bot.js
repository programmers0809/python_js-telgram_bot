const TelegramBot = require('7356385978:AAGij0_pmqfdPOCy1qkPps-gwlhlCgIE-Ss');

// Bot tokenini o'rnating
const token = '7356385978:AAGij0_pmqfdPOCy1qkPps-gwlhlCgIE-Ss';

// Botni yaratish
const bot = new TelegramBot(token, {polling: true});

// Ro'yxatdan o'tish ma'lumotlarini saqlash uchun ob'ekt
let userSignUpData = {};

// "/start" komandasi uchun handler
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Assalomu alaykum! Ro'yxatdan o'tish uchun /signup yozing.");
});

// "/signup" komandasi uchun handler
bot.onText(/\/signup/, (msg) => {
    const chatId = msg.chat.id;
    userSignUpData[chatId] = {};
    bot.sendMessage(chatId, "Ismingizni kiriting:");
});

// Foydalanuvchi tomonidan yuborilgan matnni qabul qilish
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (userSignUpData[chatId] && !userSignUpData[chatId].name) {
        userSignUpData[chatId].name = msg.text;
        bot.sendMessage(chatId, `Rahmat, ${msg.text}. Endi elektron pochtangizni kiriting:`);
    } else if (userSignUpData[chatId] && userSignUpData[chatId].name && !userSignUpData[chatId].email) {
        userSignUpData[chatId].email = msg.text;
        bot.sendMessage(chatId, `Ro'yxatdan o'tdingiz! Ma'lumotlaringiz: \nIsm: ${userSignUpData[chatId].name} \nEmail: ${userSignUpData[chatId].email}`);
        // Ro'yxatdan o'tish ma'lumotlarini tozalash
        delete userSignUpData[chatId];
    }
});
