"use client";

import { updateLocation } from "@/app/actions";
import CreationsSubmit from "@/app/components/CreationsSubmit";
import Map from "@/app/components/Map";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

import React, { useState } from "react";

interface Props {
  params: { id: string };
}

function Page(props: Props) {
  const { params } = props;

  const { getAllCountries } = useCountries();

  const [selectedCountry, setSelectedCountry] = useState("");

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });

  return (
    <div>
      <div className="w-3/5 mx-auto mb-10">
        <h1 className="text-3xl font-semibold transition-colors tracking-tight">
          Where is your home located?
        </h1>
      </div>
      <form action={updateLocation} className="">
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="country" value={selectedCountry} />

        <div className="w-3/5 mx-auto">
          <Select onValueChange={(v) => setSelectedCountry(v)} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {getAllCountries().map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.flag} {country.label} {country.region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-3/5 mx-auto mt-10">
          <LazyMap location={selectedCountry} />
        </div>
        <CreationsSubmit />
      </form>
    </div>
  );
}

export default Page;
