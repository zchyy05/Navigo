import { auth } from "@/auth";
import TripDetailClient from "@/components/trip-detail";
import { prisma } from "@/lib/prisma";
import React from "react";

const TripDetail = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;
  const session = await auth();
  if (!session) {
    return <div>Please sign in</div>;
  }
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
    include: { locations: true },
  });

  if (!trip) {
    return <div>Trip not found</div>;
  }

  return <TripDetailClient trip={trip} />;
};

export default TripDetail;
