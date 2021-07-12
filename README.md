# NextJS Steam Authentication
### 📖 Table of Contents
- [👋 Introduction](#-introduction)
- [🔌 Getting Started](#-getting-started)
- [⚙️ How It Works](#%EF%B8%8F-how-it-works)
- [💡 Improvements to Make](#-improvements-to-make)
- [📚 Helpful Resources](#-helpful-resources)

## 👋 Introduction
NextJS is a React-based web framework that aims to deliver websites as statically as possible. This can provide many performance and development benefits over a framework like [Express](https://github.com/expressjs/express#readme).

Setting up authentication can be tricky, especially with OpenID login systems such as Steam. This repository is an example of how one may go about injecting Steam user authentication into their React-based application and are looking to migrate to a framework like NextJS.

## 🔌 Getting Started

After downloading the project, you should install all of the required dependencies.

    $ npm install

Fill in a `.env` file with the following keys filled, much like `.env.sample`

    DOMAIN=http://localhost:3000 # Where this app will run
    SESSION_SECRET=ABCD # 32+ char random string
    STEAM_API_KEY= # Your Steam API Key


You can run the web application in `development` mode.

    $ npm run dev

You can also test the web application for `production` if you feel the need.

    $ npm run build
    $ npm start

## ⚙️ How It Works
`🚧 TODO 🚧`

## 💡 Improvements To Make
This is only one example of authenticating a user with their Steam account via NextJS. There are some fixes that can be added to better development and cleanliness without making significant changes.

##### Isolating Middleware
`path` is set within `login.ts`, `logout.ts` and `return.ts` or the middleware will apply to all routes. An alternative solution will need to ensure that middleware set on an API route only runs on that API route. Removing `path` from each route handler will cause constantly redirect you back to Steam's login page.

##### Avoiding Manual Request Population
`router` works in parallel with NextJS's native router. However, it needs to be explicitly activated per React page, as seen in `Index.getServerSideProps` where it will populate the `Request` object with any additional fields picked up. This can be repetitive in nature so having `router` run natively or just once for all pages would be ideal.


## 📚 Helpful Resources 
- [Authentication in NextJS](https://nextjs.org/docs/authentication)
- [next-connect](https://github.com/hoangvvo/next-connect)
- [NextJS with Passport](https://github.com/vercel/next.js/tree/canary/examples/with-passport)
- [NextJS with Passport and Next Connect](https://github.com/vercel/next.js/tree/canary/examples/with-passport-and-next-connect)
- [passport-steam](https://github.com/liamcurry/passport-steam) ([Example Usage](https://github.com/liamcurry/passport-steam/tree/master/examples/signon))
- [steam-login](https://github.com/dialupnoises/steam-login)
