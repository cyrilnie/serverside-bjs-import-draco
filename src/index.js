import * as express from "express";
import { Request, Response } from "express";
import "@babylonjs/loaders";
import {
  Tools,
  DracoCompression,
  NullEngine,
  Scene,
  SceneLoader,
} from "@babylonjs/core";
import xhr2 from "xhr2";

global.XMLHttpRequest = xhr2.XMLHttpRequest;

Tools.GetAbsoluteUrl = (url) => {
  return url;
};

DracoCompression.Configuration = {
  decoder: {
    wasmUrl:
      "https://cdn.jsdelivr.net/gh/google/draco/javascript/draco_decoder.js",
    wasmBinaryUrl:
      "https://cdn.jsdelivr.net/gh/google/draco/javascript/draco_decoder.wasm",
    fallbackUrl:
      "https://cdn.jsdelivr.net/gh/google/draco/javascript/draco_wasm_wrapper.js",
  },
};

const demo = async () => {
  const URL =
    "https://mesh-anios-local-singapore.s3.ap-southeast-1.amazonaws.com/calender-draco-compressed.glb";

  const engine = new NullEngine();
  engine.enableOfflineSupport = false;
  engine.doNotHandleContextLost = true;
  const scene = new Scene(engine);

  const splitUrl = URL.split("/");
  const filename = splitUrl.pop();
  const rootUrl = splitUrl.join("/");
  const assetContainer = await SceneLoader.LoadAssetContainerAsync(
    `${rootUrl}/`,
    filename,
    scene
  );
  console.log(assetContainer.geometries);
};
demo().catch((err) => console.log({ err }, "Encounter error"));

const app = express();
const { PORT = 3000 } = process.env;

app.get("/", async (req, res) => {
  res.send({
    message: "hello world!",
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
  });
}

export default app;
