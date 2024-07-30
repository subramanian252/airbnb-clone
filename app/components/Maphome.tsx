import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React from "react";

interface Props {
  location: string;
}

function Maphome(props: Props) {
  const { location } = props;

  const LazyMap = dynamic(() => import("./Map"), {
    loading: () => <Skeleton className="w-full h-[50vh]" />,
    ssr: false,
  });

  return <LazyMap location={location} />;
}

export default Maphome;
