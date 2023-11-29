import { getServerSession } from "next-auth";
import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";

import { authOptions } from "@/lib/auth";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  image: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
