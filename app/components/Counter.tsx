"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface Props {
  name: string;
}

function Counter(props: Props) {
  const { name } = props;

  const [amount, setAmount] = useState(0);

  return (
    <div className="flex items-center gap-x-2">
      <input type="hidden" name={name} value={amount} />
      <Button
        onClick={() => {
          if (amount > 0) setAmount(amount - 1);
        }}
        size={"icon"}
        variant={"outline"}
        type="button"
      >
        <Minus className=" h-4 w-4 text-primary" />
      </Button>
      <h3>{amount ?? 0}</h3>
      <Button
        onClick={() => setAmount((amount) => amount + 1)}
        size={"icon"}
        variant={"outline"}
        type="button"
      >
        <Plus className=" h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}

export default Counter;
