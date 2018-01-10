# electron-react-ffmpeg

### to start the project setup from scratch:
1. Started with `electron-quick-start` application cloned locally
2. `yarn add electron-builder --dev`
3. Walk through [Electron Builder setup](https://github.com/electron-userland/electron-builder#quick-setup-guide). Add appID, category for Mac, copyright information, product name, icons in a `build` folder
4. `yarn add electron-packager --dev`
5. Add cross-platform build setup in `package.json` from [AutoEdit2](https://github.com/OpenNewsLabs/autoEdit_2). See [blog post](http://pietropassarelli.com/ffmpeg-electron.html) for more information on how to do this.
6. Add FFmpeg packages:
`yarn add ffmpeg-static ffprobe-static fluent-ffmpeg`
7. Add a `config.js` file at the root of the project so that `fluent-ffmpeg` grabs static versions of `ffmpeg` and `ffprobe`
8. Install `electron-packager` globally for easy packaging from the command line: `npm install electron-packager -g`
Note: At some point I started using `npm` instead of `yarn`. Pick one if possible. I recommend `yarn` since most Electron boilerplates use it.
9. At this point, you can create an Electron application that successfully uses FFmpeg in both development and production environments.
10. Walk through [this tutorial](https://willowtreeapps.com/ideas/how-to-develop-apps-in-electron-using-react) to set up React in a development environment in Electron. This setup alone doesn't mount the React components in a packaged application.
11. Add the following npm script in `package.json`:
        "start:prod": "webpack && electron ."
    This script allows you to test whether added components/functionality will work in a packaged app and does mount React components in a production environment.
12. To be positive a new addition works in a production environment (a packaged desktop app), run `npm run bundle` in order to bundle all React components via Webpack before packaging the application. Then package the app using your global installation of `electron-packager`:
        electron-packager <project-directory-name>

### to use the existing setup
1. Clone repo: `git clone https://github.com/NUKnightLab/videojam.git`
2. Install dependencies:  `yarn add`
3. To start the app in development environment: `npm start`
4. To start the app in production environment: `npm run start:prod`
5. To package the app:
  * Install Electron Packager: `npm install electron-packager -g`
  * Run `electron-packager <project-directory-name>`
