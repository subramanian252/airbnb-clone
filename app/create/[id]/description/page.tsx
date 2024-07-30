import { createDescription } from "@/app/actions";
import Counter from "@/app/components/Counter";
import CreationsSubmit from "@/app/components/CreationsSubmit";
import SubmitButton from "@/app/components/SubmitButton";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface Props {
  params: { id: string };
}

function Page(props: Props) {
  const { params } = props;

  return (
    <>
      <div className="mt-10 w-3/5 mx-auto mb-5">
        <h1 className="text-3xl font-semibold transition-colors tracking-tight">
          Description
        </h1>
      </div>
      <form action={createDescription}>
        <input type="hidden" name="homeId" value={params?.id} />
        <div className="w-3/5 mx-auto flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              required
              placeholder="Simple title"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name="description" required placeholder="Write briefly" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              required
              placeholder="Enter your Price"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input type="file" name="image" required />
          </div>

          <div>
            <Card className="w-full">
              <CardHeader className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="font-medium underline mb-1">Guests</h3>
                    <p className="text-sm text-muted-foreground">Add guests</p>
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
          </div>
        </div>
        <CreationsSubmit />
      </form>
    </>
  );
}

export default Page;
