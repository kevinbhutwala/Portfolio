"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, ToggleButton } from "@/once-ui/components";
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
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={999} />

      <Flex
        position="fixed"
        top="0"
        left="0"
        as="header"
        zIndex={9999}
        fillWidth
        padding="24"
        horizontal="space-between"
        vertical="center"
        style={{ pointerEvents: "none" }}
      >
        <Flex fillWidth vertical="center" textVariant="body-default-s" hide="s" style={{ pointerEvents: "auto" }}>
          {display.location && <Flex>{person.location}</Flex>}
        </Flex>

        <Flex fillWidth horizontal="center" gap="8" className="nav-group" style={{ pointerEvents: "auto" }}>
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
        </Flex>

        <Flex fillWidth horizontal="end" vertical="center" textVariant="body-default-s" gap="16" style={{ pointerEvents: "auto" }}>
          <Flex hide="s">{display.time && <TimeDisplay timeZone={person.timezone} />}</Flex>
          {display.themeSwitcher && <ThemeToggle />}
        </Flex>
      </Flex>

      <style dangerouslySetInnerHTML={{__html: `
        .nav-group {
          display: flex;
          align-items: center;
          background: rgba(20, 20, 25, 0.7);
          padding: 6px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .nav-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          padding: 8px 24px;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nav-tab:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-tab.active {
          background: #00d8ff;
          color: #000;
          font-weight: 800;
          box-shadow: 0 0 20px rgba(0, 216, 255, 0.6);
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
           .nav-group {
              gap: 2px;
              padding: 4px;
           }
           .nav-tab {
              padding: 8px 12px;
              font-size: 0.75rem;
           }
        }
      `}} />
    </>
  );
};
