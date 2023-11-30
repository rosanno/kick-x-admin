"use client";

import Image from "next/image";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "./ui/button";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  return (
    <>
      <div>
        <UploadDropzone
          className="w-full"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              const imagePaths = res.map(
                (item) => item.url
              );
              onChange(imagePaths);
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
        <div className="flex flex-col space-y-2 mt-2">
          {value.length > 0 && (
            <>
              {value.map((url) => (
                <div
                  key={url}
                  className="border p-2 rounded-sm relative"
                >
                  <div
                    className="
                       w-[80px] 
                       h-[80px] 
                       bg-gray-100 
                       rounded-md 
                       flex 
                       items-center 
                       p-1.5
                       overflow-hidden
                      "
                  >
                    <Image
                      alt="product images"
                      src={url}
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="absolute right-2 top-2">
                    <Button
                      type="button"
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => onRemove(url)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
