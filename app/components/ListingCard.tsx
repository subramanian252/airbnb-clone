import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import { Heart } from "lucide-react";
import { AddFavourites, RemoveFavourites } from "./SubmitButton";
import { addFavourite, deleteFavourite } from "../actions";

interface Props {
  title: string;
  description: string;
  price: number;
  photo: string;
  country: string;
  favouriteId?: string | undefined;
  userId?: string | undefined;
  homeId?: string | undefined;
  pathName?: string | undefined;
}

function ListingCard(props: Props) {
  const {
    title,
    description,
    price,
    photo,
    country,
    favouriteId,
    userId,
    homeId,
    pathName,
  } = props;
  const { getCountriesByName } = useCountries();

  const countryDetails = getCountriesByName(country);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative h-[300px] ">
        <Image
          src={`https://bgfyhcrtsrfmyifvjfdl.supabase.co/storage/v1/object/public/images/${photo}`}
          fill
          className="rounded-lg h-full object-cover"
          alt={title}
        />
        {userId && (
          <div className="absolute top-3 p-1 rounded-md right-3 ">
            {favouriteId ? (
              <>
                <form action={deleteFavourite}>
                  <input type="hidden" name="homeId" value={homeId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <RemoveFavourites />
                </form>
              </>
            ) : (
              <form action={addFavourite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="pathName" value={pathName} />
                <input type="hidden" name="userId" value={userId} />
                <AddFavourites />
              </form>
            )}
          </div>
        )}
      </div>
      <div>
        <h1 className="text-base font-semibold mb-1">
          {countryDetails?.flag} {countryDetails?.label}{" "}
          {countryDetails?.region}
        </h1>
        <Link href={`/home/${homeId}`}>
          <h1 className="text-xl font-bold mb-1">{title}</h1>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <h1 className="text-lg text-muted-foreground font-bold mt-1">
            <span className="text-black font-semibold">${price}</span> Night
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default ListingCard;
