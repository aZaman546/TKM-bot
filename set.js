const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5FckNySDFZK3NjQjRHQjAvYjBOdlppdkhPODlhRnRFQVJ6RUZWelNXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHRPRjl6M0dIU2p6QTBQU2NNWUY5V3RHekhWcERLMHJOMXMyengrYVNqdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSm5Ua0F6cFc3ZlpGVVNHd3B3QVZXR1BOWmR6MzE2SkVGLytwZGNmTWswPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0VXMzRmRWRXhTVmx6MmRTM0JuenQ4dnV6cUttZkdmblU4T0h0T0NVaFdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZOS25EOENibGxDUlEvVkpMZnVyNVNOQmh1U3NZVnczd3p0aTlVY2lIWG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikk3RnpTRjVwL2U0Rjh4djVsNXYyMHR6cU8yQ0wyaVpNZlVGKzhWbXhkV1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0pveExrODVJcittaEZoRWc5OW83U3NJZDZrNWdaQTVRMk0waG5qSERXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjB5b1VwV1NubFlQbkRBcURLcWh4VHVaNWFDclVpc29ZQUErTXV5QUVVMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlY5Mzl3bDRQTWpPZkhBemFyRDBoazFLMk5LbHI3dXN6U2ZRaFd2V3A4c3RqLzY5U09VZnpXd1pCaXdDQVlPS3c3TC9SNXhKbkpYWGI0aXpuSVo0amdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6IkROdk8vcnFGWm9CTzRobXAvRzNaQURZNnhPbEVWd2Y1TzFRZEx0OElPOWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InVZU2pVaEhYUjEyY3dzN0hqTHZWZ1EiLCJwaG9uZUlkIjoiODhlMjBhZTAtNDBhYS00ZmU2LTg4ZTktMGRkYjU3ZTQ5OWQ2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkE5eXMvSTEyRjhqZXBBaEtEWnhxWFk2elVWYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSzNpN21pNW5wdjdTQWtqbVl1dmtFYVpCTFE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1YxRTg0WFoiLCJtZSI6eyJpZCI6IjIzNDkxMzA2MjE2MDA6MjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05TVzErZ0ZFTXZPN0xVR0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVEbUZJSlN5dmRXVnM4c1VicHNJc0tqejVlTmlEMEMyQm90VnlDZXFHMzA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImhBL0NBSHRDZ2dlWHBGN2szRGtjRkEycDJ4ZGo4a0hCOGo4N2dMVkxvV3ZJUlI4VTRlVUxUZFFXMjlmZStxazZlNTVMdHp4Nm03MjQwdTVLZ0doRkRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4QU4rZytsbmMwT1BHRzJ5VU9JTGFENVAxaVFPTEZrWlBPN1I4cWgrZUtUWUhlMm9LeFhrZ2k3bVNpTnNrZnRrcEFkSTZCYjdXTXYzeWFCTnFnL1Jndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxMzA2MjE2MDA6MjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmc1aFNDVXNyM1ZsYlBMRkc2YkNMQ284K1hqWWc5QXRnYUxWY2ducWh0OSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzU0MTMzNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIQUkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
