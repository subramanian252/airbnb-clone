import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="w-3/4 mx-auto mt-10 mb-10">
      <Skeleton className="h-[60px]" />
      <Skeleton className="h-[550px]  mt-5" />
      <div className="flex justify-between gap-x-24 mt-8">
        <Skeleton className="h-[300px] w-2/3" />
        <Skeleton className="h-[130px] w-1/3" />
      </div>
    </div>
  );
}

export default Loading;
