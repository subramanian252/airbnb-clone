"use client";

import React, { useCallback } from "react";
import { categoryItems } from "../lib/categories";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {}

function MapFiter(props: Props) {
  const {} = props;
  const searchParams = useSearchParams();

  const category = searchParams.get("filter");

  const pathName = usePathname();

  const searchQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div
      className="flex gap-x-10 mt-5 overflow-x-scroll no-scrollbar
    "
    >
      {categoryItems.map((item) => (
        <Link
          href={pathName + "?" + searchQuery("filter", item.name)}
          key={item.id}
          className={cn(
            item.name === category
              ? "border-b-2 pb-2 border-black flex-shrink-0"
              : "opacity-70 flex-shrink-0",
            "flex flex-col items-center gap-y-3 "
          )}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={24}
            height={24}
            className="w-10 h-10"
          />
          <h1>{item.title}</h1>
        </Link>
      ))}
    </div>
  );
}

export default MapFiter;
