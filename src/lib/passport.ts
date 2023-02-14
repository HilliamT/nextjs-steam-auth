import passport from "passport";
import passportSteam from "passport-steam";

const SteamStrategy = passportSteam.Strategy;


export interface SteamProfile {
    displayName: string,
    id: string,
    identifier: string,
    photos: Image,
    provider: string
}

interface Image {
    value: string,
}
passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(obj: SteamProfile, done) {
	done(null, obj);
});

passport.use(new SteamStrategy({
	returnURL: `${process.env.DOMAIN}/api/auth/return`,
	realm: `${process.env.DOMAIN}`,
	apiKey: `${process.env.STEAM_API_KEY}`
}, (_: string, profile: SteamProfile, done: (a: null | string,b: SteamProfile) => typeof done) => {
	// Fetch any more information to populate
	return done(null, profile);
}));

export default passport;