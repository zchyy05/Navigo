import { Location } from "@/app/generated/prisma";
import React, { useId, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderItinerary } from "@/lib/actions/reorder-itinerary";
interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}

const SortableItem = ({ item }: { item: Location }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="p-4 border rounded-md flex justify-between items-center hover: shadow transition-shadow"
    >
      <div>
        <h4 className="font-md text-gray-800">{item.locationTitle}</h4>

        <p className="text-sm text-gray-500 truncate max-2-xs">{`Latitude: ${item.lat}, Longitude: ${item.lng}`}</p>
      </div>
      <div className="text-sm text-gray-500">Day {item.order}</div>
    </div>
  );
};

const SortableItinerary = ({ locations, tripId }: SortableItineraryProps) => {
  const [localLocation, setLocalLocation] = useState(locations);
  const id = useId();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((item, index) => ({ ...item, order: index }));
      setLocalLocation(newLocationsOrder);
      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id)
      );
    }
  };
  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localLocation.map((loc) => loc.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {localLocation.map((item, key) => (
            <SortableItem key={key} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableItinerary;
