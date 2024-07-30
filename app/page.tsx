import MapFiter from "./components/MapFiter";
import prisma from "./lib/db";
import ListingCard from "./components/ListingCard";
import { Suspense } from "react";
import SkeletonCard from "./components/SkeletonCard";
import NoItems from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  };
  userId?: string;
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guests ?? undefined,
      bedrooms: searchParams?.rooms ?? undefined,
      bathrooms: searchParams?.bathrooms ?? undefined,
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
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  return (
    <div className="mx-auto container lg:px-10 lg:py-5">
      <MapFiter />

      <Suspense key={searchParams?.filter} fallback={<SkeletonList />}>
        <ShowCards searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowCards({
  searchParams,
  userId,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  };
  userId?: string;
}) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <div className="w-3/5 mx-auto h-full">
          <NoItems />
        </div>
      ) : (
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
      )}
    </>
  );
}

async function SkeletonList() {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-8 py-4 mt-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
