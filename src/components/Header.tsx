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
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
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
    // Basic hash tracking for the active state
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    // Set initial
    setActiveHash(window.location.hash);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />

      {/* Top Header Layer: Just Location & Time */}
      <Flex
        position="fixed"
        top="0"
        left="0"
        as="header"
        zIndex={10}
        fillWidth
        padding="24"
        horizontal="space-between"
      >
        <Flex vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>
        <Flex horizontal="end" vertical="center" textVariant="body-default-s" gap="20">
          <Flex hide="s">{display.time && <TimeDisplay timeZone={person.timezone} />}</Flex>
        </Flex>
      </Flex>

      {/* Floating Dock Navigation */}
      <div className="floating-dock">
        {routes["/#about"] && (
          <Link href="/#about" className={`dock-item ${activeHash === "#about" ? "active" : ""}`}>
            About
          </Link>
        )}
        {routes["/#experience"] && (
          <Link href="/#experience" className={`dock-item ${activeHash === "#experience" ? "active" : ""}`}>
            Experience
          </Link>
        )}
        {routes["/#projects"] && (
          <Link href="/#projects" className={`dock-item ${activeHash === "#projects" ? "active" : ""}`}>
            Projects
          </Link>
        )}
        {display.themeSwitcher && (
          <>
            <div className="dock-divider" />
            <div className="dock-item">
              <ThemeToggle />
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .floating-dock {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: rgba(30, 30, 35, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .floating-dock:hover {
          transform: translateX(-50%) translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 216, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .dock-item {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 10px 20px;
          border-radius: 100px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dock-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .dock-item.active {
          color: #000;
          background: #00d8ff;
          box-shadow: 0 0 15px rgba(0, 216, 255, 0.5);
          font-weight: 700;
        }

        .dock-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
          margin: 0 4px;
        }
      `}} />
    </>
  );
};
