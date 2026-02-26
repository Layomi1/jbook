import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad(
        { filter: /.*/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          if (args.path === "index.tsx") {
            return {
              loader: "jsx" as esbuild.Loader,
              contents: inputCode,
            };
          }

          // check to see if file has been fetched,if yes, return file immediately

          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
            args.path,
          );
          if (cachedResult) return cachedResult;

          // if no, fetch request database,fetch request database,
          const { data, request } = await axios.get(args.path);

          // store response in cache,then send the user
          const result: esbuild.OnLoadResult = {
            loader: "jsx" as esbuild.Loader,
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          await fileCache.setItem(args.path, result);
          return result;
        },
      );
    },
  };
};
