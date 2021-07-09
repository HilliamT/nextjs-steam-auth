require("dotenv").config();

module.exports = {
	env: {
		DOMAIN: process.env.DOMAIN,
		STEAM_API_KEY: process.env.STEAM_API_KEY,
		SESSION_SECRET: process.env.SESSION_SECRET
	}
};