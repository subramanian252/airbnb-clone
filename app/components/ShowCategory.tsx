import React from "react";
import { categoryItems } from "../lib/categories";
import Image from "next/image";

interface Props {
  categoryName: string;
}

function ShowCategory(props: Props) {
  const { categoryName } = props;

  const category = categoryItems.find((item) => item.name === categoryName);

  return (
    <div className="flex gap-x-4 items-center mt-5">
      <Image
        src={category?.imageUrl as string}
        width={44}
        height={44}
        alt={category?.name || "name"}
      />
      <div>
        <p className="text-lg font-bold">{category?.name}</p>
        <p>{category?.description}</p>
      </div>
    </div>
  );
}

export default ShowCategory;
