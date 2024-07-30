import { createReservation } from "@/app/actions";
import DateRangeComp from "@/app/components/DateRangeCpmp";
import Maphome from "@/app/components/Maphome";
import ShowCategory from "@/app/components/ShowCategory";
import SubmitButton from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import React from "react";

interface Props {
  params: { id: string };
}

async function getData(id: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      photo: true,
      country: true,
      guests: true,
      bedrooms: true,
      categoryName: true,
      bathrooms: true,
      Reservations: {
        select: {
          id: true,
          startDate: true,
          endDate: true,
        },
      },
      User: {
        select: {
          id: true,
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

async function Page(props: Props) {
  const { params } = props;

  const data = await getData(params.id);

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const { getCountriesByName } = useCountries();

  const countryDetails = getCountriesByName(data?.country as string);

  return (
    <div className="w-3/4 mx-auto mt-10 mb-10">
      <h1 className="text-4xl font-bold transition-colors tracking-tight">
        {data?.title}
      </h1>
      <div className="h-[550px] relative mt-5">
        <Image
          src={`https://bgfyhcrtsrfmyifvjfdl.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover"
          alt={data?.title || "home"}
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-semibold transition-colors tracking-tight mb-2">
            {countryDetails?.flag} {countryDetails?.label} /{" "}
            {countryDetails?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p>
            {" * "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>
          <Separator className="my-7" />
          <div className="mt-4 flex gap-x-3 items-center">
            <img
              alt="profile"
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              className="w-14 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {" "}
                Hosted By {data?.User?.firstName}
              </h3>
              <p className="text-muted-foreground">Host Since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />
          <ShowCategory categoryName={data?.categoryName as string} />
          <Separator className="my-7" />

          <p>{data?.description}</p>
          <Separator className="my-7" />
          <Maphome location={data?.country as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={data?.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <DateRangeComp reservations={data?.Reservations as any} />
          {user?.id ? (
            <SubmitButton placeholder="Reserve" />
          ) : (
            <Button className="w-full">Login</Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Page;
