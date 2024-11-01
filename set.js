const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0FydE5BYUZjbDJHbzdZRTJRZkIxbHZIbnR3Q1gxSFh3U0ZFSjNBUkdWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXRwV2VlOVJNR3owV3Mza0JiYWY1a3Fad0Nia3RySWJUSFZyQlRPcjd6bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQk9TNWpKczRiQ01xbmI2YXVQTm0yWGRadGc2V0JadjVQRmhMY3BYN1ZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZYUxzVy9KUDRkVFgyd2c5T1Y5RS9KTDIvODdnQ2hycGdsbHdLRlNGNjFjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitMR21DSTI0cGtNS3BiZGZ1dVlzNm5Lck9pMXRLeFBQcGN2eGdzMkZTRVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkoyNER0L3d2WGNRNnJzckdDQ0ZrRzdFcFFZUkpZd2xNT20wTTlqejdJMTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1CS0F2RW9JNHVCM2M5dUtGb0tjUjB4T0JWV0dHM3g0WFZhWm8xQWNHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzBlR09Hd0l4N3N4bDJaTytPL1RJUW5OaC9tL0FoWkM5ZEdyaDhjMWd3RT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik50bUpVdjNtOStoNmdNSXZ0RWUvQjBHc1IrZzhYQmVPSnVkbXNoazgyQjJ4eERsN0NHekRDOUdaN0huUko0ZmRESDJScTdLSExkSEY5UW5kZ3Zxc0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTUsImFkdlNlY3JldEtleSI6Ind6U1MvN3V2REZoZCtURUozb0hGTG1UdVV6RTJLV05JZFF1WUdqOFlLeEU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MDYwNDI4ODlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEUyNkI4OTI2MUE1NDI1REM2NjA0RDE2OUQwMzc0NUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMDQ5NDg1OH0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MDYwNDI4ODlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTk1MEEzQURGNzc3RjA4RjAxQTBCNjlFQUI1QzMxNEUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMDQ5NDg1OH1dLCJuZXh0UHJlS2V5SWQiOjMyLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzIsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoidWRIWEx5eXlSSFNtbmxFdlAtZzQ2QSIsInBob25lSWQiOiJiMjg5MzUyMy1jODVhLTQ3MDUtYWRhMy1lYzg4NjA4NDEwYzciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0wxSlArMXpxY05PZnQ4V0pPTXBNd2pNUXpNPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRCUHZaeWZSTFRIQXVIK1hSVWovWTEzMzdmQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIyWFRMQjg0RiIsIm1lIjp7ImlkIjoiOTQ3MDYwNDI4ODk6MTRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSGFzaGFuIFNhdGhzYXJhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMRE1ocTBIRVBhQ2xia0dHQWtnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkYWNXM2E2ZTNOZjNEd2RtczZGUDZSa0VZN1NRSlUyN2FFWG1NQUE3cncwPSIsImFjY291bnRTaWduYXR1cmUiOiI4TkZoWmF2ME1vN1ExOEJWdFNTTDZGbTJBc3o5SnlCVFRKRmFScEhOWmNkaHlJRHgvK3JVbzFXdCtrRHU5UTZlNXVWU1ZQQmpYYVVHK013a3QxaXBDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoieFp5eUFlVXowVzQyNU9zQk1pbmI5R1M5RDlyWHRycWxVV1dGVHBwUHJMcWR4UEhwUnZtSWtzQnllb1U0aG0veW01SThDZ2hTZEpFN3AyZkhteW42RFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcwNjA0Mjg4OToxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYV25GdDJ1bnR6WDl3OEhack9oVCtrWkJHTzBrQ1ZOdTJoRjVqQUFPNjhOIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwNDk0ODUwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUU3MiJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "hashan md",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94706042889",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
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
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
