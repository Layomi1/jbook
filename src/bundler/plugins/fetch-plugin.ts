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
      build.onLoad({ filter: /(^index\.tsx$)/ }, () => {
        return {
          loader: "jsx" as esbuild.Loader,
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        // check to see if file has been fetched,if yes, return file immediately
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path,
        );
        // if no, fetch request database,fetch request database,
        if (cachedResult) return cachedResult;
      });

      build.onLoad(
        { filter: /.css$/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
          const { data, request } = await axios.get(args.path);

          const escaped = data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");

          const contents = `
                const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendChild(style);
              `;

          // store response in cache,then send the user
          const result: esbuild.OnLoadResult = {
            loader: "jsx" as esbuild.Loader,
            contents,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          await fileCache.setItem(args.path, result);
          return result;
        },
      );

      build.onLoad(
        { filter: /.*/ },
        async (args: esbuild.OnLoadArgs): Promise<esbuild.OnLoadResult> => {
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
