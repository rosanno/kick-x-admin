"use client";

import { useSession, signOut } from "next-auth/react";
import {
  Bell,
  ChevronDown,
  Mail,
  Search,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { useRouter } from "next/navigation";

export const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="px-7 h-20 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold">
        Kick X
      </Link>
      <div className="flex items-center gap-10">
        <div className="space-x-1">
          <Button variant={"ghost"} size={"icon"}>
            <Bell className="w-[18px] h-[18px] text-gray-500/90" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Mail className="w-[18px] h-[18px] text-gray-500/90" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Search className="w-[18px] h-[18px] text-gray-500/90" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              role="button"
              className="flex gap-3 items-center"
            >
              <UserAvatar image={session?.user?.image} />
              <div>
                <h4 className="text-[13px] font-semibold leading-[1]">
                  {session?.user?.name}
                </h4>
                <span className="text-[10px] text-gray-400">
                  {session?.user?.role}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 mr-2 mt-5">
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-[13px]"
                onClick={() =>
                  router.push(
                    `/profile/${session?.user?.id}`
                  )
                }
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[13px]">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-[13px]"
              onClick={() =>
                signOut({
                  callbackUrl:
                    "http://localhost:3000/login",
                })
              }
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
