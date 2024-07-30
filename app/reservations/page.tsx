import React from "react";
import NoItems from "../components/NoItems";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListingCard from "../components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData(userId: string | undefined) {
  const data = await prisma.reservations.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Home: {
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
      },
    },
  });
  return data;
}

async function Page(props: Props) {
  noStore();
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const data = await getData(user?.id);

  return (
    <div className="w-full lg:px-10 lg:py-5 container mt-10">
      <h1 className="text-4xl font-bold transition-colors tracking-tight">
        Your Reservation
      </h1>
      {data?.length === 0 && (
        <NoItems
          title="No Reservations Found"
          description="Please Start Booking"
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
            favouriteId={item.Home?.favourites[0]?.id as string | undefined}
            userId={user?.id}
            homeId={item?.Home?.id}
            pathName="/"
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
