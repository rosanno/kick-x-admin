"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export const UserAvatar = ({
  image,
}: {
  image: string;
}) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={image}
        alt="image"
        className="object-cover"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
