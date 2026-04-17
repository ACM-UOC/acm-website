import { Event } from "@/data/events";
import { TeamMember } from "@/components/Team";

const db_url: string = "https://data.uoc.acm.org/wp-json/wp/v2/";

const createURL = (table_name: string, page: number) : string => {
    return `${db_url}${table_name}?acf_format=standard&_fields=id,acf,&per_page=100&page=${page}`;
}

async function fetchFromDb(table_name: string, revalidate_after: number): Promise<any[]> {
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


async function getEvents(): Promise<Event[]>  {
    try {
        const rawEvents = await fetchFromDb("events", 60*60*24);

        const mappedEvents = rawEvents.map((event: any) => {
            const acf = event.acf || {};
            return {
                id: event.id || -1,
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

        return mappedEvents;

    } catch (error) {
        return [];
    }
}

export function sortEvents(a: Event, b: Event, status: "upcoming" | "past") {
  const months: { [key: string]: number } = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  const getTimestamp = (dateStr: string) => {
    const [dayStr, month, year] = dateStr.split(" ");

    const day = status === "upcoming"
      ? dayStr.split('-')[0]
      : dayStr.split('-').pop();

    return new Date(Number(year), months[month], Number(day)).getTime();
  };

  const timeA = getTimestamp(a.date);
  const timeB = getTimestamp(b.date);

  if (status === "upcoming")
    return timeA - timeB;
  else
    return timeB - timeA;
}

export const getUpcomingEvents = async () => (await getEvents()).filter(e => e.status === "upcoming");
export const getPastEvents = async () => (await getEvents()).filter(e => e.status === "past");
export const getEventById = async (id: number) => (await getEvents()).find(e => e.id === id);
export const getAllYears = async () => Array.from(new Set((await getPastEvents()).map(e => e.date.split(" ").pop())));

export async function getAcmMembers(): Promise<TeamMember[]> {
  try {
    const allMembers = await fetchFromDb("members", 60*60*24);

    const result = allMembers.map((member: any) => {
      const acf = member.acf;

      return {
        name: `${acf.firstname_en} ${acf.lastname_en}`,
        name_gr: `${acf.firstname_gr} ${acf.lastname_gr}`,
        roles: acf.role,
        linkedin: acf.link_linkedin,
        image: (acf.image===false) ? '' : acf.image,
      };
    });

    const sortedRoles = ["chair", "vice_chair", "treasurer", "secretary"];
    const getRank = (role: string) => {
      const index = sortedRoles.indexOf(role);
      return index === -1 ? Infinity : index;
    };

    result.sort((a, b) => {
      let a_min = Math.min(...a.roles.map(getRank));
      let b_min = Math.min(...b.roles.map(getRank));
      return a_min - b_min;
    });

    return result;
  } catch (error) {
    return [];
  }
}
