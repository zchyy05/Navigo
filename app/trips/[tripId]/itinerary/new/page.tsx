"use server";
import React from "react";
import NewLocationClient from "@/components/new-location";
const NewLocation = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;
  return <NewLocationClient tripId={tripId} />;
};

export default NewLocation;
