const path = require("path");
const fs = require("fs");
const lessToJs = require("less-vars-to-js");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require("customize-cra");
/*
  react-app-rewired - hat is to say you now "own" the configs. No support will be provided. Proceed with caution.
  create-react-app suggests to fork CRA and customise webpack config. which is bit risky to maintain own repo for react-scripts.

  We are going to use react-app-rewired for time being till we get the solid soultion from CRA team as they have plan to incorportate config override changes.

*/
//We cannot use react-scripts-rewired package to leverage this
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, "./src/assets/styles/boilerplate-antd.less"),
    "utf8"
  )
);
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeVariables
  }),
  addWebpackAlias({
    "@common": path.resolve(__dirname, "src/common")
  })
);
