import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { events } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function EventDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Fetch event details with venue, region and ticket types
  const { id } = await params;
  const event = await db.query.events.findFirst({
    where: eq(events.id, id),
    with: {
      venue: true,
      region: true,
      eventTickets: true, // Correct relation name from schema
    },
  });

  if (!event) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time: Date | null) => {
    if (!time) return 'N/A';
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to determine event status based on date
  const getEventStatus = (eventDate: Date) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    
    if (eventDateTime > now) {
      return { label: "Upcoming", className: "bg-yellow-100 text-yellow-800" };
    } else {
      return { label: "Completed", className: "bg-green-100 text-green-800" };
    }
  };

  const status = getEventStatus(event.date);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Event Details</h1>
        <div className="space-x-2">
          <Link
            href={`/admin/events/${event.id}/edit`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Edit Event
          </Link>
          <Link
            href={`/admin/events/${event.id}/delete`}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Delete Event
          </Link>
          <Link 
            href="/admin/events" 
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Back to Events
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 w-24">Date:</span>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 w-24">Time:</span>
              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 w-24">Venue:</span>
              {event.venue ? (
                <Link href={`/admin/venues/${event.venue.id}`} className="text-blue-600 hover:underline">
                  {event.venue.name ?? "N/A"}
                </Link>
              ) : (
                "N/A"
              )}
            </div>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 w-24">Region:</span>
              {event.region ? (
                <Link href={`/admin/regions/${event.region.id}`} className="text-blue-600 hover:underline">
                  {event.region.name ?? "N/A"}
                </Link>
              ) : (
                "N/A"
              )}
            </div>
            <div className="flex items-center mb-4">
              <span className="font-medium text-gray-700 w-24">Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                {status.label}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 block mb-2">Description:</span>
              <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
            </div>
          </div>
        </div>
        <div>
          {event.imageUrl && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Event Poster</h3>
              <Image
                src={event.imageUrl}
                alt={`${event.title} poster`}
                width={300}
                height={400}
                className="rounded-lg shadow-md mb-6 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Ticket Types</h3>
        {event.eventTickets && event.eventTickets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seat Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {event.eventTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.seatType}</div>
                      {ticket.description && (
                        <div className="text-xs text-gray-500">{ticket.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.price.toLocaleString()} THB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.capacity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.soldCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.capacity - ticket.soldCount}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">No ticket types defined</div>
        )}
      </div>
    </div>
  );
} 