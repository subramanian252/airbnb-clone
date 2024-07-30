"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createAirBnbHome(userId: string) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!data) {
    const data2 = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data2?.id}/structure`);
  } else if (
    data &&
    !data.addedDescription &&
    !data.addedLocation &&
    !data.addedCategory
  ) {
    return redirect(`/create/${data?.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data?.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data?.id}/location`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data2 = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data2?.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const homeId = formData.get("homeId");
  const category = formData.get("category");

  const data = await prisma.home.update({
    where: {
      id: homeId as string,
    },
    data: {
      categoryName: category as string,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData: FormData) {
  const homeId = formData.get("homeId");
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const guests = formData.get("guests");
  const rooms = formData.get("rooms");
  const bathrooms = formData.get("bathRooms");

  const { data: ImageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${Date.now()}`, imageFile, {
      cacheControl: "3600",
      contentType: "image/png",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId as string,
    },
    data: {
      title: title as string,
      description: description as string,
      price: Number(price),
      photo: ImageData?.path as string,
      guests: guests as string,
      bedrooms: rooms as string,
      bathrooms: bathrooms as string,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/location`);
}

export async function updateLocation(formData: FormData) {
  const homeId = formData.get("homeId");
  const country = formData.get("country");

  const data = await prisma.home.update({
    where: {
      id: homeId as string,
    },
    data: {
      country: country as string,
      addedLocation: true,
    },
  });
  return redirect(`/`);
}

export async function addFavourite(formData: FormData) {
  const homeId = formData.get("homeId");
  const userId = formData.get("userId");
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favourites.create({
    data: {
      homeId: homeId as string,
      userId: userId as string,
    },
  });
  return revalidatePath(pathName);
}

export async function deleteFavourite(formData: FormData) {
  const homeId = formData.get("homeId");
  const userId = formData.get("userId");
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favourites.deleteMany({
    where: {
      homeId: homeId as string,
      userId: userId as string,
    },
  });
  return revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const homeId = formData.get("homeId");
  const userId = formData.get("userId");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  const data = await prisma.reservations.create({
    data: {
      homeId: homeId as string,
      userId: userId as string,
      startDate: startDate as string,
      endDate: endDate as string,
    },
  });
  return redirect("/");
}
