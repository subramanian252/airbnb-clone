import { File } from "lucide-react";
import React from "react";

interface Props {
  title?: string;
  description?: string;
}

function NoItems(props: Props) {
  const {
    title = "Sorry no listing found",
    description = "Try another filter or add your own airbnb",
  } = props;

  return (
    <div className="min-h-[500px] flex flex-col gap-y-3 justify-center items-center animate-in fade-in-50 text-center">
      <div className="bg-primary/20 rounded-full p-6">
        <File size={50} className="text-primary" />
      </div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  );
}

export default NoItems;
