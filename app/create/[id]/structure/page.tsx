import { createCategoryPage } from "@/app/actions";

import SelectedCategory from "@/app/components/SelectedCategory";

import React from "react";
import CreationsSubmit from "@/app/components/CreationsSubmit";

interface Props {
  params: { id: string };
}

function Page(props: Props) {
  const { params } = props;

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h1 className="text-3xl font-semibold transition-colors tracking-tight">
          Which of these best describes your property
        </h1>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params?.id} />

        <SelectedCategory />

        <CreationsSubmit />
      </form>
    </>
  );
}

export default Page;
