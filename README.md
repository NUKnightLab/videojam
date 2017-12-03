# electron-react-ffmpeg

1. Started with `electron-quick-start` application cloned locally
2. `yarn add electron-builder --dev`
3. Walk through [Electron Builder setup](https://github.com/electron-userland/electron-builder#quick-setup-guide). Add appID, category for Mac, copyright information, product name, icons in a `build` folder
4. `yarn add electron-packager --dev`
5. Add cross-platform build setup in `package.json` from [AutoEdit2](https://github.com/OpenNewsLabs/autoEdit_2). See [blog post](http://pietropassarelli.com/ffmpeg-electron.html) for more information on how to do this.
6. Add FFmpeg packages:
`yarn add ffmpeg-static ffprobe-static fluent-ffmpeg`
7. Add a `config.js` file at the root of the project so that `fluent-ffmpeg` grabs static versions of `ffmpeg` and `ffprobe`
8. Install `electron-packager` globally for easy packaging from the command line:
`npm install electron-packager -g`
Note: At some point I started using `npm` instead of `yarn`. Pick one if possible.
9. At this point, you can create an Electron application that successfully uses FFmpeg *in the packaged version!!!* Next thing to solve for is getting React components to mount in packaged application.
10. At some point (before I did steps 7-9), I walked through [this tutorial](https://willowtreeapps.com/ideas/how-to-develop-apps-in-electron-using-react) to set up React in Electron. However, this setup alone doesn't mount the React components in a packaged application so that's the next issue I'll be tackling. 
