import passport from "passport";
import SteamStrategy from "passport-steam";

passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new SteamStrategy({
	returnURL: `${process.env.DOMAIN}/api/auth/return`,
	realm: `${process.env.DOMAIN}`,
	apiKey: `${process.env.STEAM_API_KEY}`
}, (_, profile, done) => {
	// Fetch any more information to populate
	return done(null, profile);
}));

export default passport;