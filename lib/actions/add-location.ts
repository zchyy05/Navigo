"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

const geoCodeAddress = async (address: string) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await response.json();

  if (!data.results?.[0]) {
    throw new Error("Geocoding failed: Invalid address or no results.");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
};

export const addLocation = async (formData: FormData, tripId: string) => {
  const session = await auth;
  if (!session) {
    throw new Error("Not authenticated");
  }
  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng } = await geoCodeAddress(address);
  const count = await prisma.location.count({ where: { tripId } });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });
  redirect(`/trips/${tripId}`);
};
