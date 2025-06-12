# musickitjs-v3-types

Demo app for showing typing issues with MusicKit JS v3 in TypeScript.

## Prerequisites

- Node.js (tested with v22 LTS)
- MusicKit Developer Token, see: <https://developer.apple.com/documentation/applemusicapi/generating-developer-tokens>

## Initial setup

```sh
npm install
```

Store your developer token in a `.env` file inside the `app` folder.

```ini
MUSICKIT_DEVELOPER_TOKEN="YOUR_JWT_TOKEN_GOES_HERE"
```

## Running locally

To run the SvelteKit server locally with Vite, run the command:

```sh
npm run dev
```

![npm run dev output](./img/npm-run-dev.png)

Open the Local web address in your browser.

You should now see the Welcome page. Click the 'Go to MusicKit page' link.

![browser with welcome page](./img/welcome-page.png)
![browser with MusicKit page](./img/musickit-page.png)

On that page you can authorize with MusicKit.
