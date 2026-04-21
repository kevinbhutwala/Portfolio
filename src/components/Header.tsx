"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

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

export default TimeDisplay;

export const Header = () => {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    setActiveHash(window.location.hash);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={99} />

      <Flex
        position="fixed"
        top="0"
        left="0"
        as="header"
        zIndex={100}
        fillWidth
        padding="24"
        horizontal="space-between"
        vertical="center"
      >
        <Flex fillWidth vertical="center" textVariant="body-default-s" hide="s">
          {display.location && <Flex>{person.location}</Flex>}
        </Flex>

        <Flex fillWidth horizontal="center" gap="8" className="nav-group">
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

        <Flex fillWidth horizontal="end" vertical="center" textVariant="body-default-s" gap="16">
          <Flex hide="s">{display.time && <TimeDisplay timeZone={person.timezone} />}</Flex>
          {display.themeSwitcher && <ThemeToggle />}
        </Flex>
      </Flex>

      <style dangerouslySetInnerHTML={{__html: `
        .nav-group {
          display: flex;
          align-items: center;
        }

        .nav-tab {
          background: rgba(30, 30, 35, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-tab:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .nav-tab.active {
          background: #00d8ff;
          color: #000;
          font-weight: 700;
          border-color: rgba(0, 216, 255, 0.5);
          box-shadow: 0 5px 15px rgba(0, 216, 255, 0.3);
        }

        @media (max-width: 768px) {
           .nav-group {
              gap: 6px;
           }
           .nav-tab {
              padding: 6px 12px;
              font-size: 0.8rem;
           }
        }
      `}} />
    </>
  );
};
