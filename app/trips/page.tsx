import { auth } from "@/auth";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Car } from "lucide-react";
import { prisma } from "@/lib/prisma";
const TripsPage = async () => {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );
  if (!session) {
    return (
      <div className="flex justify-between items-center h-screen text-gray-700 text-xl">
        Please Sign in
      </div>
    );
  }
  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href={"/trips/new"}>
          <Button>
            New Trip
            <Car className="w-6 h-6 text-primary-foreground" />
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>Welcome back, {session.user?.name}</CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {trips.length === 0
              ? "Start planning your first trip by clicking the button aboce"
              : `You have ${trips.length} ${
                  trips.length === 1 ? "trip" : "trips"
                } planned. ${
                  upcomingTrips.length > 0
                    ? `${upcomingTrips.length} upcoming`
                    : ``
                }`}
          </p>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-xl font-bold mb-2"> Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl mb-2">No trips yet</h3>
              <p className="text-center mb-4 max-w-md">
                Start planning your adventure by creating your first trip
              </p>
            </CardContent>
            <Link href={"/trips/new"}>
              <Button>Create Trip</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 6).map((trip) => (
              <Link href={`/trips/${trip.id}`} key={trip.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="line-clamp-1 font-medium">
                    {trip.title}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2 mb-2">
                      {trip.description}
                    </p>
                    <div className="text-sm text-gray-600">
                      {new Date(trip.startDate).toLocaleDateString()} -
                      {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
