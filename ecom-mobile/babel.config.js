module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@/src": "./src",
            "@/components": "./src/components",
            "@/constants": "./src/constants",
            "@/hooks": "./src/hooks",
            "@/services": "./src/services",
            "@/store": "./src/store",
            "@/utils": "./src/utils",
            "@/assets": "./src/assets",
          },
        },
      ],
    ],
  };
};
