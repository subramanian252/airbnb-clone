import Image from "next/image";
import React from "react";
import airbnbLogo from "@/public/airbnb-desktop.png";
import airbnbMobileLogo from "@/public/airbnb-mobile.webp";
import Link from "next/link";
import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";

interface Props {}

function Navbar(props: Props) {
  const {} = props;

  return (
    <div className="w-full border-b">
      <div className="container py-3 flex items-center justify-between lg:px-10 lg:py-5 mx-auto">
        <Link href={"/"}>
          <Image
            src={airbnbLogo}
            alt="airbnb logo"
            className="hidden lg:block w-32"
          />
          <Image
            src={airbnbMobileLogo}
            alt="airbnb logo"
            className="block lg:hidden w-12"
          />
        </Link>
        <SearchComponent />
        <UserNav />
      </div>
    </div>
  );
}

export default Navbar;
