"use client";

import Image from "next/image";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import { UploadButton } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ProfileProps {
  user: User | null | undefined;
  userId: string;
}

export const Profile = ({ userId, user }: ProfileProps) => {
  const router = useRouter();

  return (
    <Card className="border-0 rounded-sm shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm">
          Account Settings
        </CardTitle>
        <CardDescription className="text-[13px]">
          Update your personal details here.
        </CardDescription>
        <div className="border-b border-b-gray-100/90 py-1" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <div className="h-20 w-20 rounded-md overflow-hidden">
            <Image
              src={`${
                user?.photo_url
                  ? user?.photo_url
                  : "https://github.com/shadcn.png"
              }`}
              alt="@shadcn"
              height={75}
              width={75}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold">
              Account Picture
            </h3>
            <div className="pt-2 flex items-center gap-1.5">
              <UploadButton
                appearance={{
                  button: "w-full h-full p-1.5 text-sm",
                  container: "rounded-md",
                  allowedContent: "hidden",
                }}
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  await axios.patch(`/api/user/${userId}`, {
                    ...user,
                    image_url: res && res[0].url,
                    password: undefined,
                  });
                  toast.success("Photo updated.");
                  router.refresh();
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                }}
              />
              <Button
                variant={"ghost"}
                size={"sm"}
                className="border border-gray-200"
              >
                <Trash className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
