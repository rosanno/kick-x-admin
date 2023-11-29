import { createNextRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { NextRequest } from "next/server";

import { ourFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(req: NextRequest) {
  const { url } = await req.json();
  const utapi = new UTApi();

  await utapi.deleteFiles(url);

  return Response.json({ message: "Image deleted" });
}
