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
    photos: number[]; // Array of photo IDs/URLs for the gallery
    sponsors: Sponsor[];
    speakers?: Speaker[];
    agenda?: AgendaItem[];
}

const GOOGLE: Sponsor = { name: "Google", logo: "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg", url: "https://google.com", desc: "Empowering developers worldwide with open-source tools and cloud infrastructure." };
const GITHUB: Sponsor = { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", url: "https://github.com", desc: "The world's leading AI-powered developer platform to build, scale, and deliver secure software." };
const REACT: Sponsor = { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", url: "https://react.dev", desc: "The library for web and native user interfaces." };
const CLOUDFLARE: Sponsor = { name: "Cloudflare", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg", url: "https://cloudflare.com", desc: "A global network built for the cloud." };
const VERCEL: Sponsor = { name: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg", url: "https://vercel.com", desc: "The platform for frontend developers, providing the speed and reliability needed to innovate." };

export const eventsDatabase: ACMEvent[] = [
    // --- 4 UPCOMING EVENTS ---
    {
        id: "game-dev-workshop",
        status: "upcoming",
        date: "22 OCT 2026",
        year: "2026",
        category: "Workshop",
        image: "public/game.jpeg",
        photos: [],
        sponsors: [GOOGLE, GITHUB],
        speakers: [
            { name: "John Carmack", role: "Legendary Engine Dev", image: "https://i.pravatar.cc/150?u=john" },
            { name: "Unity Expert", role: "Senior Dev @ Unity", image: "https://i.pravatar.cc/150?u=unity" }
        ],
        agenda: [
            { time: "10:00 AM", title: "Introduction to ECS", desc: "Learning the Entity Component System architecture." },
            { time: "12:00 PM", title: "Physics Engines", desc: "Building custom collision detection from scratch." },
            { time: "15:00 PM", title: "Networking in Games", desc: "Solving latency issues in multiplayer environments." }
        ]
    },

    // --- 4 PAST EVENTS ---
    {
        id: "event_1",
        status: "past",
        date: "15 OCT 2025",
        year: "2025",
        category: "Web Dev",
        image: "public/game.jpeg",
        photos: [1, 2, 3, 4],
        sponsors: [REACT],
        speakers: [{ name: "Dan Abramov", role: "React Core Team", image: "https://i.pravatar.cc/150?u=dan" }]
    },
    {
        id: "event_2",
        status: "past",
        date: "20 SEP 2024",
        year: "2024",
        category: "Security",
        image: "public/game.jpeg",
        photos: [1, 2],
        sponsors: [CLOUDFLARE],
        speakers: [{ name: "Troy Hunt", role: "HIBP Creator", image: "https://i.pravatar.cc/150?u=troy" }]
    },
    {
        id: "event_3",
        status: "past",
        date: "05 MAR 2024",
        year: "2024",
        category: "Game Dev",
        image: "public/game.jpeg",
        photos: [1, 2, 3],
        sponsors: [GOOGLE]
    },
    {
        id: "event_4",
        status: "past",
        date: "10 DEC 2023",
        year: "2023",
        category: "Cloud Computing",
        image: "public/game.jpeg",
        photos: [1, 2, 3, 4, 5],
        sponsors: [CLOUDFLARE, VERCEL]
    }
];
// --- HELPER FUNCTIONS ---
export const getUpcomingEvents = () => eventsDatabase.filter(e => e.status === "upcoming");
export const getPastEvents = () => eventsDatabase.filter(e => e.status === "past");
export const getEventById = (id: string) => eventsDatabase.find(e => e.id === id) || null;
export const getAllYears = () => Array.from(new Set(getPastEvents().map(e => e.year)));