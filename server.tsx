import { Application } from "oak/application.ts";
// @deno-types="@types/react-dom/server"
import { renderToReadableStream } from "react-dom/server";
import { Document } from "./Document.tsx";

const app = new Application();

app.use(async (ctx) => {
  ctx.response.body = await renderToReadableStream(<Document />);
});

await app.listen({ port: 8000 });
