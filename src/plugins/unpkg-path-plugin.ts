import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        console.log("onResolve", args);
        if (args.path === "index.tsx") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",

            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/",
            ).href,
          };
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad(
        { filter: /.*/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          console.log("onLoad", args);

          if (args.path === "index.tsx") {
            return {
              loader: "jsx" as esbuild.Loader,
              contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
            };
          }
          const { data, request } = await axios.get(args.path);

          return {
            loader: "jsx" as esbuild.Loader,
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };
        },
      );
    },
  };
};
