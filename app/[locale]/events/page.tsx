import { Suspense } from 'react';
import EventCards from '@/components/EventCards';
import PastEvents from '@/components/PastEvents';
import EventSlider from '@/components/EventsSlider';
import { getPastEvents, getAllYears } from '@/lib/db_parser';
import PastEventsAnimation from '@/components/PastEventsAnimation';


export default async function EventsPage() {
  const pastEvents = await getPastEvents();
  const dynamicYears = await getAllYears();
  const years = ["All", ...dynamicYears];

  return (
    <main className="min-h-screen bg-slate-50 relative z-0">
      <div className="absolute top-0 left-0 w-full h-[45vh] min-h-[450px] bg-white rounded-b-[4rem] shadow-sm -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        <PastEventsAnimation />

        <div className="mb-32">
          <EventSlider>
            <Suspense fallback={<div className="animate-pulse text-slate-400">Loading upcoming events...</div>}>
              <EventCards page="slider" />
            </Suspense>
          </EventSlider>
        </div>

        <PastEvents pastEvents={pastEvents} years={years} />
      </div>
    </main>
  );
}
