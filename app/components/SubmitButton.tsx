"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  placeholder?: string;
}

function SubmitButton(props: Props) {
  const { pending } = useFormStatus();
  const { placeholder = "next" } = props;
  return (
    <>
      {pending ? (
        <Button className="w-full" size={"lg"} variant={"default"} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          className="w-full"
          type="submit"
          size={"lg"}
          variant={"default"}
        >
          {placeholder}
        </Button>
      )}
    </>
  );
}

export const AddFavourites = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={"outline"} size={"icon"} disabled>
          <Loader2 className=" h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button variant={"outline"} size={"icon"}>
          <Heart className=" h-5 w-5 " />
        </Button>
      )}
    </>
  );
};

export const RemoveFavourites = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant={"outline"} size={"icon"} disabled>
          <Loader2 className=" h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button variant={"outline"} size={"icon"}>
          <Heart fill="red" className=" h-5 w-5 border-primary" />
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
