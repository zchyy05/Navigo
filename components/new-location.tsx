"use client";
import React, { useTransition } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { addLocation } from "@/lib/actions/add-location";

const NewLocationClient = ({ tripId }: { tripId: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-muted">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center">Add New Location</h1>
          <form
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
            className="space-y-6"
          >
            <div>
              <Label>Address</Label>
              <input
                name="address"
                type="text"
                required
                className="w-full border border-border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full">
              {isPending ? "Adding" : "Add Location"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLocationClient;
