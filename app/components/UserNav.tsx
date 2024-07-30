import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirBnbHome } from "../actions";

interface Props {}

async function UserNav(props: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const {} = props;

  const formAction = createAirBnbHome.bind(null, user?.id as string);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full border px-4 py-2 flex gap-x-3 items-center">
            <MenuIcon className="h-5 w-5 " />
            <img
              src={
                !user?.picture
                  ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  : user?.picture
              }
              alt="avatar"
              className="w-9 rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-white">
          {!user ? (
            <>
              <DropdownMenuItem>
                <LoginLink className="w-full">LogIn</LoginLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RegisterLink className="w-full">SignIn</RegisterLink>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <form action={formAction} className="w-full">
                  <button type="submit" className="w-full text-start">
                    Airbnb your Home
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/myhomes" className="w-full">
                  My Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="w-full" href="/favourites">
                  Favourites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="w-full" href="/reservations">
                  Reservations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutLink>LogOut</LogoutLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserNav;
