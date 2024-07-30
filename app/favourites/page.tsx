import React from "react";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListingCard from "../components/ListingCard";
import NoItems from "../components/NoItems";
import { redirect } from "next/navigation";

interface Props {}

async function getData(userId: string | undefined) {
  const data = await prisma.favourites.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      User: {
        select: {
          id: true,
        },
      },
      Home: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          photo: true,
          country: true,
        },
      },
    },
  });

  return data;
}

async function Page(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const data = await getData(user?.id);

  if (!user) redirect("/");

  return (
    <div className="w-full lg:px-10 lg:py-5 container mt-10">
      <h1 className="text-4xl font-bold transition-colors tracking-tight">
        Your Favourites
      </h1>
      {data?.length === 0 && (
        <NoItems
          title="No Favourites Found"
          description="Add your favourites"
        />
      )}
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8 py-4 mt-6">
        {data?.map((item) => (
          <ListingCard
            title={item?.Home?.title as string}
            description={item?.Home?.description as string}
            price={item?.Home?.price as number}
            photo={item?.Home?.photo as string}
            key={item.id}
            country={item?.Home?.country as string}
            favouriteId={item.id as string | undefined}
            userId={item?.User?.id}
            homeId={item?.Home?.id}
            pathName="/"
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
