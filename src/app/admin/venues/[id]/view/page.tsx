"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";

// Define the expected type for venue data
interface VenueDetail {
  id: string;
  name: string;
  address?: string;
  capacity?: number | null;
  regionId?: string;
  latitude?: number | null;
  longitude?: number | null;
  thumbnailUrl?: string | null;
  imageUrls?: string[] | null;
  createdAt?: Date;
  updatedAt?: Date;
  isFeatured?: boolean;
  region?: { id: string; name: string } | null;
}

export default function VenueViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  // State for navigation between venues
  const [allVenueIds, setAllVenueIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // Fetch the venue details
  const { data: venue, isLoading, error } = api.venue.getById.useQuery({ id });

  // Fetch all venue IDs for navigation
  const { data: venuesList } = api.venue.getAllIds.useQuery();

  useEffect(() => {
    if (venuesList && venuesList.length > 0) {
      setAllVenueIds(venuesList);
      const index = venuesList.findIndex((venueId) => venueId === id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [venuesList, id]);

  // Navigate to previous venue
  const goToPrevVenue = () => {
    if (currentIndex > 0) {
      const prevId = allVenueIds[currentIndex - 1];
      router.push(`/admin/venues/${prevId}/view`);
    }
  };

  // Navigate to next venue
  const goToNextVenue = () => {
    if (currentIndex < allVenueIds.length - 1) {
      const nextId = allVenueIds[currentIndex + 1];
      router.push(`/admin/venues/${nextId}/view`);
    }
  };

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) return <div className="p-4">Loading venue details...</div>;
  if (error)
    return (
      <div className="p-4 text-red-600">
        Error loading venue: {error.message}
      </div>
    );
  if (!venue) return <div className="p-4">Venue not found</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{venue.name}</h1>
          <div className="flex space-x-3">
            <Link
              href={`/admin/venues/${venue.id}/edit`}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Edit Venue
            </Link>
            <Link
              href="/admin/venues"
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Back to List
            </Link>
          </div>
        </div>

        {/* Navigation between venues */}
        <div className="mb-6 flex justify-between">
          <button
            onClick={goToPrevVenue}
            disabled={currentIndex <= 0}
            className={`flex items-center ${currentIndex <= 0 ? "cursor-not-allowed text-gray-400" : "text-blue-600 hover:text-blue-800"}`}
          >
            <svg
              className="mr-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Previous Venue
          </button>
          <span className="text-gray-500">
            {currentIndex + 1} of {allVenueIds.length}
          </span>
          <button
            onClick={goToNextVenue}
            disabled={currentIndex >= allVenueIds.length - 1}
            className={`flex items-center ${currentIndex >= allVenueIds.length - 1 ? "cursor-not-allowed text-gray-400" : "text-blue-600 hover:text-blue-800"}`}
          >
            Next Venue
            <svg
              className="ml-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            {venue.thumbnailUrl && (
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <div className="border-b bg-gray-50 px-4 py-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Thumbnail
                  </h3>
                </div>
                <div className="flex justify-center p-4">
                  <Image
                    src={venue.thumbnailUrl}
                    alt={`${venue.name} Thumbnail`}
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                    unoptimized
                  />
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-lg border shadow-sm">
              <div className="border-b bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Venue Details
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{venue.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Region
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {venue.region?.name ?? "N/A"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Capacity
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {venue.capacity ?? "Not specified"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Featured
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {venue.isFeatured ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          No
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {venue.address ?? "Not specified"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Created
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(venue.createdAt)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Last Updated
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(venue.updatedAt)}
                    </dd>
                  </div>
                  {venue.latitude && venue.longitude && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Coordinates
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {venue.latitude}, {venue.longitude}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:col-span-2">
            {venue.imageUrls && venue.imageUrls.length > 0 && (
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <div className="border-b bg-gray-50 px-4 py-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Venue Images
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
                  {venue.imageUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={url}
                        alt={`${venue.name} Image ${index + 1}`}
                        fill
                        className="rounded-md object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-lg border shadow-sm">
              <div className="border-b bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Additional Information
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  This section can display additional information about the
                  venue, such as amenities, opening hours, or other relevant
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
