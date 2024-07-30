import React from "react";
import prisma from "../lib/db";
import ListingCard from "../components/ListingCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NoItems from "../components/NoItems";

interface Props {}

async function getData(userId: string | undefined) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      photo: true,
      country: true,
      favourites: {
        where: {
          userId: userId,
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

  return (
    <div className="w-full lg:px-10 lg:py-5 container mt-10">
      <h1 className="text-4xl font-bold transition-colors tracking-tight">
        My Homes
      </h1>
      {data?.length === 0 && (
        <NoItems title="No Homes Found" description="Add your homes" />
      )}
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-8 py-4 mt-6">
        {data.map((item) => (
          <ListingCard
            title={item.title as string}
            description={item.description as string}
            price={item.price as number}
            photo={item.photo as string}
            key={item.id}
            country={item.country as string}
            favouriteId={item.favourites?.[0]?.id as string | undefined}
            userId={user?.id}
            homeId={item.id}
            pathName="/"
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
