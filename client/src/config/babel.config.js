module.exports = {
    presets: [
      '@babel/preset-env', // Transform modern JavaScript to older versions
      '@babel/preset-react', // Transform JSX
    ],
    plugins: [
      '@babel/plugin-transform-runtime', // This plugin is used for handling async/await and other features
    ],
  };
  