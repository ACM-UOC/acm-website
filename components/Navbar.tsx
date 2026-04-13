"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from "./LanguageSwitcher";
const JoinDrawer = dynamic(() => import('./JoinDrawer'), { ssr: false });

export default function Navbar() {
    const t = useTranslations();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isJoinDrawerOpen, setIsJoinDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [shakingLink, setShakingLink] = useState<string | null>(null);
    const isDark = !isScrolled && pathname === "/";

    const navLinks = [
        { id: "home", href: "/" },
        { id: "team", href: "/teams" },
        { id: "events", href: "/events" },
        { id: "about", href: "/about" },
    ];

    const handleActiveClick = (id: string) => {
        setShakingLink(id);
        setTimeout(() => setShakingLink(null), 400);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);


        navLinks.forEach((link) => {
            if (link.href.startsWith("/#")) {
                const sectionId = link.href.replace("/", "");
                const section = document.querySelector(sectionId);
                if (section) observer.observe(section);
            } else if (link.id === "home") {
                const section = document.querySelector("#home");
                if (section) observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [pathname]);


    return (
        <>
            {/* main Navbar */}
            <nav className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ${isScrolled
                    ? "bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm py-2"
                    : pathname === "/"
                        ? "bg-transparent py-4 border-b border-transparent shadow-none"
                        : "bg-slate-50 py-4 border-b border-transparent shadow-none"
                }`}>
                <div className="max-w-[95%] mx-auto px-4 h-12 flex items-center justify-between">

                    {/* Logo Section - Now wrapped in Link */}
                    <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="ACM UOC Logo"
                                width={48}
                                height={48}
                                priority
                                className="object-contain drop-shadow-sm"
                            />
                        </div>

                        <div className="flex flex-col justify-center">
                            <span className={`font-bold text-2xl tracking-tighter leading-none transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                ACM <span className={`font-black italic transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>UOC</span>
                            </span>
                            <span className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-300 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                                Student Chapter
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {

                            let isActive = false;
                            if (pathname === "/") {

                                if (link.id === "home") isActive = activeSection === "home";
                                else isActive = activeSection === link.id;
                            } else {

                                isActive = pathname === link.href;
                            }

                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => { if (isActive) handleActiveClick(link.id); }}
                                    className={`text-[17px] font-bold transition-all relative group py-2 ${isActive ? (isDark ? "text-blue-400" : "text-blue-600") : (isDark ? "text-slate-200 hover:text-white" : "text-slate-600 hover:text-blue-600")} ${shakingLink === link.id ? "animate-shake" : ""}`}
                                >
                                    {t(`nav.${link.id}`)}
                                    <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                                </Link>
                            );
                        })}

                        {/* Language Switcher */}
                        <LanguageSwitcher />
                        {/* Join Button — temporarily hidden
                        <button
                            type="button"
                            onClick={() => setIsJoinDrawerOpen(true)}
                            aria-label={t('join.button')}
                            className={`cursor-pointer px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 ${isDark ? 'bg-white/10 text-white border border-white/20 hover:bg-blue-600 hover:border-transparent backdrop-blur-sm' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                        >
                            {t('join.button')}
                        </button> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="cursor-pointer md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-[100]"
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-slate-900'} ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-slate-900'} ${isOpen ? "opacity-0" : ""}`}></span>
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-slate-900'} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                    </button>

                </div>
            </nav>

            <JoinDrawer isOpen={isJoinDrawerOpen} onClose={() => setIsJoinDrawerOpen(false)} />

            {/* Mobile Menu  */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                <div className="absolute inset-0 bg-white shadow-2xl"></div>

                <div className="relative z-[110] flex flex-col h-full">

                    {/* Header  */}
                    <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 bg-white">
                        <span className="text-xs font-bold text-slate-600 tracking-[0.3em] uppercase italic">{t('nav.menu')}</span>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col p-8 pt-10 space-y-8">
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="cursor-pointer group flex items-center space-x-4"
                                >
                                    <span className="text-blue-600 font-mono text-[10px] font-bold">0{index + 1}</span>
                                    <span className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                        {t(`nav.${item.id}`)}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col space-y-4 pt-6 border-t border-slate-100">
                            {/* Language Switcher */}
                            <div className="scale-110 origin-left">
                                <LanguageSwitcher />
                            </div>
                            {/* Join Us button — temporarily hidden
                            <button
                                type="button"
                                onClick={() => {
                                    setIsJoinDrawerOpen(true);
                                    setIsOpen(false);
                                }}
                                className="cursor-pointer w-full bg-slate-900 text-white px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300"
                            >
                                {t('join.button')}
                            </button> */}
                        </div>

                        {/* Footer-info */}
                        <div className="pt-4 border-t border-slate-50">
                            <p className="text-slate-600 text-[9px] font-bold tracking-[0.2em] uppercase">
                                ACM Student Chapter @ UOC
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
