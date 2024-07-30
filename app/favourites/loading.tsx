import React from "react";
import SkeletonCard from "../components/SkeletonCard";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="w-full lg:px-10 lg:py-5 container mt-10">
      <h1 className="text-4xl font-bold transition-colors tracking-tight">
        Your Favourites
      </h1>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8 py-4 mt-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export default Loading;
