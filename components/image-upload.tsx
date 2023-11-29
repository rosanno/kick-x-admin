"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "react-hot-toast";

import { UploadButton } from "@/lib/uploadthing";
import { Progress } from "./ui/progress";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2.5 flex-wrap mt-2">
        {value.length > 0 && (
          <>
            {value.map((url) => (
              <div
                key={url}
                className="
                   relative
                   w-[95px] 
                   h-[95px] 
                   bg-gray-100 
                   rounded-md 
                   flex 
                   items-center 
                   p-3
                   overflow-hidden
                  "
              >
                <Image
                  alt="product images"
                  src={url}
                  width={100}
                  height={100}
                />
                <div
                  role="button"
                  className="absolute top-1 right-1 bg-gray-500/20 rounded-full p-1"
                  onClick={() => onRemove(url)}
                >
                  <X className="h-4 w-4 opacity-50" />
                </div>
              </div>
            ))}
          </>
        )}
        <div className="relative z-20">
          <UploadButton
            appearance={{
              button: "w-full h-full cursor-pointer",
              container:
                "border-2 border-dashed rounded-md w-[95px] h-[95px]",
              allowedContent: "hidden",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setUploading(false);
                res.map((item) => onChange(item.url));
              }
            }}
            onUploadProgress={(progress) => {
              setUploading(true);
              setProgress(progress);
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          <Plus
            className="
               h-4 
               w-4 
               absolute 
               top-1/2 
               -translate-y-2 
               left-1/2 
               -translate-x-2
               opacity-50
               -z-10
              "
          />
        </div>
      </div>
      {uploading && (
        <Progress value={progress} className="w-24 mt-2" />
      )}
    </>
  );
};
