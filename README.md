## Commands

`npm install`

`npm run dev`

`npm run serve`

https://github.com/daquinoaldo/https-localhost to run https in localhost

Or you can also use just the command `npm run dev`. The PWA will work since we have this configuration in `vite.config.ts`:

```
devOptions: {
 enabled: true
}
```

## Envs:

You need to create a .env file and add this envs for the firebase DB:

```
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```
