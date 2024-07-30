import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function SkeletonCard(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col gap-y-1">
      <Skeleton className="h-[300px] rounded-lg" />
      <Skeleton className="h-[30px] rounded-lg w-full" />
      <Skeleton className="h-[30px] rounded-lg w-1/2" />
      <Skeleton className="h-[30px] rounded-lg w-1/3" />
    </div>
  );
}

export default SkeletonCard;
