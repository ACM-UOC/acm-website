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


export interface Event {
    title_en: string;
    title_gr: string;
    status: "upcoming" | "past";
    type: string;
    date: string;
    time: string;
    description_en: string;
    description_gr: string;
    details_en: string;
    details_gr: string;
    registrationUrl?: string; // External link:Google Form, Eventbrite, etc.
    image: string;
    speakers?: string;
    // speakers?: Speaker[];
    // sponsors: Sponsor[];
    // agenda?: AgendaItem[];
    // photos: number[];
}

const GOOGLE: Sponsor = { name: "Google", logo: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg", url: "https://google.com", desc: "Empowering developers worldwide with open-source tools and cloud infrastructure." };
const GITHUB: Sponsor = { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", url: "https://github.com", desc: "The world's leading AI-powered developer platform to build, scale, and deliver secure software." };
const REACT: Sponsor = { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", url: "https://react.dev", desc: "The library for web and native user interfaces." };
const CLOUDFLARE: Sponsor = { name: "Cloudflare", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg", url: "https://cloudflare.com", desc: "A global network built for the cloud." };
const VERCEL: Sponsor = { name: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg", url: "https://vercel.com", desc: "The platform for frontend developers, providing the speed and reliability needed to innovate." };

// Suppress unused warnings until sponsors are assigned to events
void GOOGLE, GITHUB, REACT, CLOUDFLARE, VERCEL;

export const eventsDatabase: ACMEvent[] = [
    // --- 4 UPCOMING EVENTS ---
    {
        id: "game-dev-workshop",
        status: "upcoming",
        date: "21 APR 2026",
        year: "2026",
        category: "Workshop",
        image: "/gamejam/1-cut.png",
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
        image: "/game-jam-banner.jpg",
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
        image: "/careerfair-2024.png",
        photos: [],
        sponsors: [],
    }
];
// --- HELPER FUNCTIONS ---
export const getUpcomingEvents = () => eventsDatabase.filter(e => e.status === "upcoming");
export const getPastEvents = () => eventsDatabase.filter(e => e.status === "past");
export const getEventById = (id: string) => eventsDatabase.find(e => e.id === id) || null;
export const getAllYears = () => Array.from(new Set(getPastEvents().map(e => e.year)));
