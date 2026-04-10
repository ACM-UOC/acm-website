// data/events.ts

export interface Sponsor {
    name: string;
    logo: string;
    url: string;
    desc?: string;
}

export interface Speaker {
    name: string;
    role: string;
    image: string;
}

export interface AgendaItem {
    time: string;
    title: string;
    desc: string;
}

export interface ACMEvent {
    id: string;
    status: "upcoming" | "past";
    date: string;
    year: string;
    category: string;
    image: string;
    photos: number[];
    sponsors: Sponsor[];
    speakers?: Speaker[];
    agenda?: AgendaItem[];
    registrationUrl?: string; // External link:Google Form, Eventbrite, etc.
}

export const eventsDatabase: ACMEvent[] = [
    // --- 4 UPCOMING EVENTS ---
    {
        id: "game-dev-workshop",
        status: "upcoming",
        date: "21 APR 2026",
        year: "2026",
        category: "Workshop",
        image: "/gamejam/GameJamPoster-preview-lower.jpg",
        photos: [],
        sponsors: [],
        // speakers: [
        //     // { name: "John Carmack", role: "Legendary Engine Dev", image: "https://i.pravatar.cc/150?u=john" },
        //     // { name: "Unity Expert", role: "Senior Dev @ Unity", image: "https://i.pravatar.cc/150?u=unity" }
        // ],
        // agenda: [
        //     // { time: "10:00", title: "Industry Experts Panel", desc: "Working professionals share their path into the games industry:what studios actually look for and how the field works." },
        //     // { time: "12:00", title: "The Tools of the Trade", desc: "An overview of the game development stack: engines, version control, asset pipelines, and how modern teams ship games." },
        //     // { time: "14:00", title: "Hands-On: Your First 3D World", desc: "Guided Unity + C# session where every participant builds and runs their first 3D scene from scratch." },
        // ],
        registrationUrl: "https://itch.io/jam/csd-jam",
    },
    {
        id: "game-jam",
        status: "upcoming",
        date: "29-30 APR 2026",
        year: "2026",
        category: "Game Jam",
        image: "/gamejam/1-cut.png",
        photos: [],
        sponsors: [],
        registrationUrl: "https://itch.io/jam/csd-jam",
    },

    // --- PAST EVENTS ---
    {
        id: "careerfair-2024",
        status: "past",
        date: "2024",
        year: "2024",
        category: "Career Fair",
        image: "/game.jpeg",
        photos: [],
        sponsors: [],
    }
];
// --- HELPER FUNCTIONS ---
export const getUpcomingEvents = () => eventsDatabase.filter(e => e.status === "upcoming");
export const getPastEvents = () => eventsDatabase.filter(e => e.status === "past");
export const getEventById = (id: string) => eventsDatabase.find(e => e.id === id) || null;
export const getAllYears = () => Array.from(new Set(getPastEvents().map(e => e.year)));
