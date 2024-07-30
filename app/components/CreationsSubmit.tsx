import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import SubmitButton from "./SubmitButton";

interface Props {}

function CreationsSubmit(props: Props) {
  const {} = props;

  return (
    <div className="px-10 z-10 h-24 bg-white w-full py-5 flex justify-between items-center fixed bottom-0">
      <Button size={"lg"} variant={"secondary"} asChild>
        <Link href={"/"}>Cancel</Link>
      </Button>
      <SubmitButton />
    </div>
  );
}

export default CreationsSubmit;
