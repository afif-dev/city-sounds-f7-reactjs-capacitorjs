# City Sounds

## Screenshot

![](/custom-splash-screen.jpg) ![](/home.jpg)
![](/favourite.jpg) ![](/info-device.jpg)
![](/music-player.jpg) ![](/music-player-with-timer)
![](/music-player-timer.jpg)

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "D:\\laragon\\www\\tutorials\\capacitorjs\\city-sound",
  "type": [
    "capacitor"
  ],
  "name": "City Sounds",
  "framework": "react",
  "template": "tabs",
  "bundler": "vite",
  "cssPreProcessor": false,
  "theming": {
    "customColor": true,
    "color": "#b700ff",
    "darkTheme": true,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false,
  "pkg": "net.c88i.citysound",
  "capacitor": {
    "platforms": [
      "ios",
      "android"
    ]
  }
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal

```
npm install
```

## NPM Scripts

- 🔥 `start` - run development server
- 🔧 `dev` - run development server
- 🔧 `build` - build web app for production
- 📱 `build-capacitor-ios` - build app and copy it to iOS capacitor project
- 📱 `build-capacitor-android` - build app and copy it to Android capacitor project

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## Capacitor

This project created with Capacitor support. And first thing required before start is to add capacitor platforms, run in terminal:

```
npx cap add ios && npx cap add android
```

Check out [official Capacitor documentation](https://capacitorjs.com) for more examples and usage examples.

## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```

## Capacitor Assets

Capacitor assets are located in `resources` folder which is intended to be used with `cordova-res` tool. To generate mobile apps assets run in terminal:

```
npx cordova-res
```

Check out [official cordova-res documentation](https://github.com/ionic-team/cordova-res) for more usage examples.

## Documentation & Resources

- [Framework7 Core Documentation](https://framework7.io/docs/)

- [Framework7 React Documentation](https://framework7.io/react/)

- [Framework7 Icons Reference](https://framework7.io/icons/)
- [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:

- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7
