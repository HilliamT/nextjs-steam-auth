import Link from "next/link";
import router from "../lib/router";
import { NextApiRequest, NextApiResponse } from "next";

import { SteamProfile } from "@/lib/passport";
import type { NextSteamAuthApiRequest } from "../lib/router";

export default function Index({ user }:{user: SteamProfile}) {
  console.log(user) // Shows the SteamProfile object in console.
	return <div style={{ textAlign: "center" }}>
		{user
			? <div>
				Welcome back!<br />
				From logging in, your SteamID is {user.id}.<br />
				You can call other APIs to get more information within `getServerSideProps` or within `lib/passport.ts`.<br />
				<Link href="/api/auth/logout">Logout</Link>
			</div>

			:<div>
				Welcome!<br />
				<Link href="/api/auth/login">Login</Link>
			</div>
		}
	</div>;
}


export async function getServerSideProps({ req, res}:{req: NextSteamAuthApiRequest, res: NextApiResponse}) {
    await router.run(req, res);
    return { props: { user: req.user || null } };
}