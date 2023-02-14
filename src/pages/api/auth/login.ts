import passport from '../../../lib/passport';
import router from '../../../lib/router';

interface AuthLoginResponse extends Response {
	redirect: (path: string) => any;
}

const path = "/api/auth/login";

export default router
	.use(path, passport.authenticate("steam", { failureRedirect: "/"}))
	.get(path, (_, res: AuthLoginResponse) => res.redirect("/"));