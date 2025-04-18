import Link from "next/link";
import { db } from "~/server/db";
import { events, regions } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { MapPinIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { notFound } from "next/navigation";

// Define types for the event data
type UpcomingEvent = {
  id: string;
  title: string;
  date: Date;
  thumbnailUrl: string | null;
  venue: { name: string } | null;
  region: { name: string } | null;
};

type RegionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Function to get events for a specific region
async function getRegionEvents(regionId: string) {
  try {
    const regionEvents = await db.query.events.findMany({
      columns: { 
        id: true,
        title: true,
        date: true,
        thumbnailUrl: true,
      },
      with: {
        venue: { columns: { name: true } },
        region: { columns: { name: true } },
      },
      orderBy: [desc(events.date)],
      where: eq(events.regionId, regionId),
      limit: 10, // Showing more events on the region page
    });
    return regionEvents;
  } catch (error) {
    console.error("Error fetching region events:", error);
    return [];
  }
}

export default async function RegionPage({ params }: RegionPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Find the region by slug
  const region = await db.query.regions.findFirst({
    where: eq(regions.slug, slug),
  });
  
  // If region not found, return 404
  if (!region) {
    notFound();
  }
  
  // Get events for this region
  const regionEvents: UpcomingEvent[] = await getRegionEvents(region.id);
  
  // Format date function
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center gap-8 px-4 py-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Muay Thai in <span className="text-[hsl(280,100%,70%)]">{region.name}</span>
          </h1>
          
          {region.description && (
            <p className="text-xl text-center mb-4">
              {region.description}
            </p>
          )}
        </div>
        
        {/* Region Events Section */}
        <section className="w-full max-w-5xl mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              Events in {region.name}
            </h2>
            <Link
              href="/events" 
              className="text-[hsl(280,100%,70%)] hover:text-[hsl(280,100%,80%)]"
            >
              View All Events &rarr;
            </Link>
          </div>
          
          {regionEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {regionEvents.map((event) => (
                <Link 
                  key={event.id} 
                  href={`/events/${event.id}`}
                  className="block bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-colors shadow-lg group"
                >
                  <div className="relative w-full h-48 bg-white/5">
                    {event.thumbnailUrl ? (
                      <Image
                        src={event.thumbnailUrl}
                        alt={`${event.title} thumbnail`}
                        fill
                        className="object-cover" 
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/10 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-sm text-[hsl(280,100%,70%)] mb-2">
                      {formatDate(event.date)}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[hsl(280,100%,70%)] transition-colors">{event.title}</h3>
                    {event.venue && (
                      <div className="flex items-center text-gray-300 text-sm mb-1">
                        <BuildingLibraryIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                        {event.venue.name}
                      </div>
                    )}
                    {event.region && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                        {event.region.name}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No events found in {region.name}</h3>
              <p className="text-gray-300 mb-4">
                There are no scheduled events in this region at the moment.
              </p>
              <Link 
                href="/events" 
                className="text-[hsl(280,100%,70%)] hover:text-[hsl(280,100%,80%)]"
              >
                Browse all events
              </Link>
            </div>
          )}
        </section>
        
        {/* About Region Section */}
        <section className="w-full max-w-5xl mt-16 bg-white/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">About Muay Thai in {region.name}</h2>
          <div className="text-gray-300">
            <p className="mb-4">
              {region.name} offers unique opportunities to experience authentic Muay Thai in Thailand. 
              Whether you're looking to attend exciting events, train at a local gym, or learn about 
              the cultural significance of Muay Thai in this region, we'll help you find the perfect 
              Muay Thai experience.
            </p>
            <p>
              Browse all the upcoming events in {region.name} above, or explore our offerings for 
              training packages and experiences in this beautiful part of Thailand.
            </p>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-5xl mt-16">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/training"
          >
            <h3 className="text-2xl font-bold">Train in {region.name} &rarr;</h3>
            <div className="text-lg">
              Discover Muay Thai training camps and gyms in {region.name}.
            </div>
          </Link>
          
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/venues"
          >
            <h3 className="text-2xl font-bold">Venues in {region.name} &rarr;</h3>
            <div className="text-lg">
              Explore Muay Thai stadiums and venues across {region.name}.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
} 