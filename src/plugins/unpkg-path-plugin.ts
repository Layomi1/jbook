import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // handle root file of index.js
      build.onResolve({ filter: /(^index\.tsx$)/ }, () => {
        return { path: "index.tsx", namespace: "a" };
      });

      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
          namespace: "a",

          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
