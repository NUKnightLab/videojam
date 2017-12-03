var path = require("path");
// https://nodejs.org/api/path.html#path_path_resolve_paths
// var appDir = path.resolve("./package.json");

// const {app} = require('electron');
var ffmpegPath = require('ffmpeg-static').path;
var ffprobePath = require('ffprobe-static').path;

module.exports = {
  ffmpegPath: ffmpegPath,
  ffprobePath: ffprobePath
};
