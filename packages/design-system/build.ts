await Bun.build({
  entrypoints: ["index.ts"],
  naming: {
    chunk: "[name]-[hash].[ext]",
  },
  outdir: "./dist",
  splitting: true,
  minify: true,
  sourcemap: "external",
  target: "browser",
});
