"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "./Counter";
import SubmitButton from "./SubmitButton";
import Maphome from "./Maphome";

interface Props {}

function SearchComponent(props: Props) {
  const {} = props;

  const [step, setStep] = useState(1);

  const { getAllCountries } = useCountries();

  const [selectedCountry, setSelectedCountry] = useState("");

  function SubmitButtonPage() {
    if (step === 1) {
      return (
        <Button type="button" onClick={() => setStep((step) => step + 1)}>
          Next
        </Button>
      );
    } else if (step === 2) {
      return <SubmitButton />;
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-full flex items-center border-2 px-4 py-2">
          <div className="flex gap-x-2 divide-x-2">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Add Items</p>
            <p className="px-4">Add Guests</p>
          </div>
          <Search className="h-7 w-7 bg-primary text-white rounded-full p-1" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <form>
          <input type="hidden" name="country" value={selectedCountry} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
                <DialogDescription>Please Choose a Country</DialogDescription>
              </DialogHeader>
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
              <div className="mt-5">
                <Maphome location={selectedCountry} />
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select the filter</DialogTitle>
                <DialogDescription>Please Choose a Filter</DialogDescription>
              </DialogHeader>
              <Card className="w-full">
                <CardHeader className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline mb-1">Guests</h3>
                      <p className="text-sm text-muted-foreground">
                        Add guests
                      </p>
                    </div>
                    <Counter name="guests" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline mb-1">Rooms</h3>
                      <p className="text-sm text-muted-foreground">Add Rooms</p>
                    </div>
                    <Counter name="rooms" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="font-medium underline mb-1">Bathrooms</h3>
                      <p className="text-sm text-muted-foreground">
                        Add Bathrooms
                      </p>
                    </div>
                    <Counter name="bathRooms" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButtonPage />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SearchComponent;
