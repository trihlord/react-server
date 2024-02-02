import type { Manifest } from "vite";

import { Application, Router } from "oak/mod.ts";
// @deno-types="@types/react-dom/server"
import { renderToReadableStream } from "react-dom/server";

import { Document } from "./Document.tsx";

async function readManifestOptions() {
  const { default: manifest }: { default: Manifest } = await import(
    import.meta.resolve("./dist/.vite/manifest.json"),
    { with: { type: "json" } }
  );
  const bootstrapModules = Object.values(manifest).map(({ file }) => file);
  return { bootstrapModules };
}

const router = new Router();
router.get("/", async function handleDocument(ctx) {
  const options = await readManifestOptions();
  ctx.response.body = await renderToReadableStream(<Document />, options);
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async function handleAssets(ctx) {
  await ctx.send({ root: `${Deno.cwd()}/dist` });
});
await app.listen({ port: 8000 });
