const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Remove 'svg' from assetExts
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");

// Add 'svg' to sourceExts (so it can be transformed)
config.resolver.sourceExts.push("svg");

// Use svg transformer
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

module.exports = config;