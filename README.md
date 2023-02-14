# NextJS Steam Authentication
### 📖 Table of Contents
- [👋 Introduction](#-introduction)
- [🔌 Getting Started](#-getting-started)
- [⚙️ How It Works](#%EF%B8%8F-how-it-works)
- [💡 Improvements to Make](#-improvements-to-make)
- [📚 Helpful Resources](#-helpful-resources)

## 👋 Introduction
NextJS is a React-based web framework that aims to deliver websites as statically as possible. This can provide many performance and development benefits over a framework like [Express](https://github.com/expressjs/express#readme).

Setting up authentication can be tricky, especially with OpenID login systems such as Steam (there are not many implementations avaiable, let alone in NextJS). This repository is an example of how one may go about injecting Steam user authentication. This allows you to use Steam authentication with a NextJS API backend, and implement such components into your own project



## 🔌 Getting Started

After downloading the project, you should install all of the required dependencies.

    $ npm install

Fill in a `.env` file with the following keys filled, much like `.env.sample` (Remove `.sample` off the file name)

    DOMAIN=http://localhost:3000 # Where this app will run
    SESSION_SECRET=ABCD # 32+ char random string
    STEAM_API_KEY= # Your Steam API Key


You can run the web application in `development` mode.

    $ npm run dev

You can also test the web application for `production` if you feel the need.

    $ npm run build
    $ npm start

## ⚙️ How It Works
- You make a request to the api/steam/login endpoint
- Redirects you to steam oauth with a clientID (somehow) via the passport middleware in `passport.ts`
- After you authenticate your account, it redirects you to the frontend with a cookie being sent to the backend.
- The router directs the data received from the authentication, and sends it to the frontend via `getServerSideProps`. You can access it via the `user` parameter in the Index function `index.tsx`.


## 💡 Improvements To Make
This is only one example of authenticating a user with their Steam account via NextJS. There are some fixes that can be added to better development and cleanliness without making significant changes.

##### Isolating Middleware
`path` is set within `login.ts`, `logout.ts` and `return.ts` or the middleware will apply to all routes. An alternative solution will need to ensure that middleware set on an API route only runs on that API route. Removing `path` from each route handler will cause constantly redirect you back to Steam's login page.

##### Avoiding Manual Request Population
`router` works in parallel with NextJS's native router. However, it needs to be explicitly activated per React page, as seen in `Index.getServerSideProps` where it will populate the `Request` object with any additional fields picked up. This can be repetitive in nature so having `router` run natively or just once for all pages would be ideal. **`getServerSideProps` receives the request of the steam profile data on the frontend.**

## "How to make the Steam auth a component?"

You can copy and paste the component structure on `index.tsx`to another component of your choice (say, `steam.tsx`), just ensure you have the props paramater in both the component and the page file (`index.tsx`) to allow `getServerSideProps` to inject the request object cookie from the backend. (You only need `getServerSideProps` on the `index.tsx`, or page of the rendered content).

Example


**Here is our Here is Steam.tsx, our component-ized Steam authentication.**

```ts


import Link from "next/link";
import router from "@/lib/auth/router";
import type { SteamProfile } from '@/lib/state/state'


export default function Steam({ user }: {user: SteamProfile}) {
    console.log(user)
	return <div style={{ textAlign: "center" }}>
		{user 
			? <div className='font-bold'>
				Welcome back!<br />
				From logging in, your SteamID is {user.id}.<br />
				You can call other APIs to get more information within `getServerSideProps` or within `lib/passport.ts`.<br />
				<Link href="/api/auth/logout">Logout</Link>
			</div>

			: <div>
				Welcome!<br />
				<Link href="/api/auth/login">Login</Link>
			</div>
		}
	</div>;
}
```

**Now here is our index.tsx, passing the request object to the Steam function.**

```ts
import router from '@/lib/auth/router'
import type { SteamProfile } from '@/lib/passport'
import type { NextSteamAuthApiRequest } from "../lib/router";


import Steam from '@/lib/components/auth/Steam';

export default function Home({ user }: {user: SteamProfile}) {
  return (
    <>
    <Steam user={user}/>
    
    </>
  )
}

export async function getServerSideProps({ req, res}:{req: NextSteamAuthApiRequest, res: NextApiResponse}) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
```

## 📚 Helpful Resources 
- [Authentication in NextJS](https://nextjs.org/docs/authentication)
- [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- [next-connect](https://github.com/hoangvvo/next-connect)
- [NextJS with Passport](https://github.com/vercel/next.js/tree/canary/examples/with-passport)
- [NextJS with Passport and Next Connect](https://github.com/vercel/next.js/tree/canary/examples/with-passport-and-next-connect)
- [passport-steam](https://github.com/liamcurry/passport-steam) ([Example Usage](https://github.com/liamcurry/passport-steam/tree/master/examples/signon))
- [steam-login](https://github.com/dialupnoises/steam-login)
