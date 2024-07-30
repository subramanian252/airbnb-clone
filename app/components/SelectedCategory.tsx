"use client";

import React, { useState } from "react";
import { categoryItems } from "../lib/categories";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface Props {}

function SelectedCategory(props: Props) {
  const {} = props;

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="grid grid-cols-4 gap-8 w-3/5 mx-auto mt-10 mb-36">
      <input type="hidden" name="category" value={selectedCategory} />
      {categoryItems.map((item) => (
        <Card
          key={item.id}
          className={`${
            selectedCategory === item.name
              ? "border-b-2 border-r-2 border-primary"
              : ""
          } cursor-pointer`}
          onClick={() => setSelectedCategory(item.name)}
        >
          <CardHeader className="flex items-center flex-col">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={50}
              height={50}
              className="mb-2"
            />
            <h3 className="font-medium">{item.name}</h3>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default SelectedCategory;
