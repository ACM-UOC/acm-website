import { Event } from "@/data/events";
import { map } from "framer-motion/client";

const db_url: string = "https://data.uoc.acm.org/wp-json/wp/v2/";

const createURL = (table_name: string, page: number) : string => {
    return `${db_url}${table_name}?acf_format=standard&_fields=id,acf,&per_page=100&page=${page}`;
}

export async function fetchFromDb(table_name: string, revalidate_after: number): Promise<any[]> {
    let page = 1;
    let allResults: any[] = [];

    while(true) {
        const data_url = createURL(table_name, page);
        const res = await fetch(data_url, {
            next: { 
                tags: [table_name],
                revalidate: revalidate_after,
            }
        });

        // Found the last page
        if (!res.ok || res.status == 400) break;
    
        const data = await res.json();
        if(data.length === 0) break;
        allResults = allResults.concat(data);
    
        page++;
    }

    return allResults;
}


export async function getEvents(): Promise<Event[]>  {
    try {
        const rawEvents = await fetchFromDb("events", 60*60*24);

        const mappedEvents = rawEvents.map((event: any) => {
            const acf = event.acf || {};
            return {
                title_en: acf.title_en || "",
                title_gr: acf.title_gr || "",
                status: acf.status,
                type: acf.type || "Event",
                date: acf.date || "",
                time: acf.time || "",
                description_en: acf.description_en || "",
                description_gr: acf.description_gr || "",
                details_en: acf.details_en || "",
                details_gr: acf.details_gr || "",
                image: (acf.image===false) ? "" : acf.image,
                registrationUrl: acf.registration_url,
                speakers: acf.speakers || "",
                place_name: acf.place_name || "",
                place_google_maps_link: acf.place_google_maps_link || "",
            };
        });

        console.log("MAPPED EVENTS: ", mappedEvents);

        return mappedEvents;

    } catch (error) {
        return [];    
    }
}

// export const getUpcomingEvents = () => getEvents.filter(e => e.status === "upcoming");
// export const getPastEvents = () => eventsDatabase.filter(e => e.status === "past");
// export const getEventById = (id: string) => eventsDatabase.find(e => e.id === id) || null;
// export const getAllYears = () => Array.from(new Set(getPastEvents().map(e => e.year)));
