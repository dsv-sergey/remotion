import express from "express";
import webpack from "webpack";
import path from "path";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { webpackConfig } from "./webpack-config";

export const startServer = async (entry: string) => {
  const app = express();
  const config = webpackConfig(entry);
  const compiler = webpack(config);

  app.use("/", express.static(path.join(__dirname, "..", "web")));
  app.use(webpackDevMiddleware(compiler));
  app.use(
    webpackHotMiddleware(compiler, {
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );

  app.listen(3000);
  console.log("Server started");
};