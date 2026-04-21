"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Flex } from "@/once-ui/components";
import { routes, display } from "@/app/resources";
import { person } from "@/app/resources/content";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export const Header = () => {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    setActiveHash(window.location.hash);
    
    // Dynamic ScrollSpy
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
      let current = "";
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = "#" + sections[i];
            break;
          }
        }
      }
      if (current && current !== activeHash) {
        setActiveHash(current);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeHash]);

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "90px", zIndex: 998, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(10, 10, 12, 0.9) 0%, rgba(10, 10, 12, 0.4) 60%, transparent 100%)", backdropFilter: "blur(4px)" }} className="nav-fade" />

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "20px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 9999,
          pointerEvents: "none"
        }}
      >
        {/* Left Side: Location */}
        <Flex vertical="center" textVariant="body-default-s" hide="s" style={{ pointerEvents: "auto", flex: 1 }}>
          {display.location && <Flex>{person.location}</Flex>}
        </Flex>

        {/* Center: Navigation Pill (Absolutely centered) */}
        <div className="nav-group-wrapper" style={{ pointerEvents: "auto" }}>
          <div className="nav-group">
            {routes["/#about"] && (
              <button onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#about");
                setActiveHash("#about");
              }} className={`nav-tab ${activeHash === "#about" ? "active" : ""}`}>
                About
              </button>
            )}
            {routes["/#experience"] && (
              <button onClick={() => {
                document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#experience");
                setActiveHash("#experience");
              }} className={`nav-tab ${activeHash === "#experience" ? "active" : ""}`}>
                Experience
              </button>
            )}
            {routes["/#projects"] && (
              <button onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#projects");
                setActiveHash("#projects");
              }} className={`nav-tab ${activeHash === "#projects" ? "active" : ""}`}>
                Projects
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Theme & Time */}
        <Flex horizontal="end" vertical="center" textVariant="body-default-s" gap="16" style={{ pointerEvents: "auto", flex: 1 }}>
          <Flex hide="s">{display.time && <TimeDisplay timeZone={person.timezone} />}</Flex>
          {display.themeSwitcher && <ThemeToggle />}
        </Flex>
      </header>

      <style dangerouslySetInnerHTML={{__html: `
        .nav-group-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          width: fit-content;
        }

        .nav-group {
          display: flex;
          align-items: center;
          background: rgba(20, 20, 25, 0.85);
          padding: 8px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          gap: 4px;
        }

        .nav-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 10px 24px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          position: relative;
          z-index: 1;
        }

        .nav-tab:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-tab.active {
          background: #00d8ff;
          color: #000;
          font-weight: 800;
          box-shadow: 0 0 15px rgba(0, 216, 255, 0.5);
          border: 1px solid rgba(0, 216, 255, 0.8);
        }

        @media (max-width: 768px) {
           .nav-group-wrapper {
              position: static;
              transform: none;
              width: 100%;
           }
           header {
              padding: 16px 5% !important;
              flex-wrap: wrap;
              justify-content: center !important;
           }
           .nav-group {
              width: 100%;
              justify-content: space-between;
              padding: 6px;
              gap: 2px;
           }
           .nav-tab {
              padding: 10px 14px;
              font-size: 0.75rem;
              letter-spacing: 0.05em;
              flex: 1;
              text-align: center;
           }
           /* On mobile, push the theme toggle below or hide it if it breaks flow */
           header > div:last-child {
              position: absolute;
              top: 16px;
              right: 5%;
           }
        }
        
        @media (max-width: 400px) {
           .nav-tab {
              padding: 8px 8px;
              font-size: 0.65rem;
           }
        }
      `}} />
    </>
  );
};
