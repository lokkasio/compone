const { CI } = process.env
module.exports = (config) =>
  config.set({
    frameworks: ["qunit"],
    files: [
      { pattern: "test/**/*.spec.js", type: "module" },
      { pattern: "test/**/*!(.spec).js", type: "module", included: false },
      { pattern: "src/**/*.js", type: "module", included: false },
    ],
    reporters: ["dots"],
    autoWatch: !CI,
    singleRun: CI,
    client: {
      clearContext: CI,
      qunit: {
        showUI: !CI,
      },
    },
    browsers: ["FirefoxHeadless"],
  })
