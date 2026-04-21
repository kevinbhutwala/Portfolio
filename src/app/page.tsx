"use client"
import React, { useEffect, useState } from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row } from "@/once-ui/components";
import { home, about, person, projects } from "@/app/resources/content";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }, { x: 7, y: 8 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const PlayableMockup = () => {
  // Snake State
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 4, y: 4 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = React.useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // Collisions
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE || prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, Math.max(80, 200 - score * 2));
    return () => clearInterval(intervalId);
  }, [direction, gameStarted, gameOver, food, score]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!gameStarted || gameOver) return;
    switch(e.key) {
      case 'ArrowUp': e.preventDefault(); if (direction.y === 0) setDirection({x: 0, y: -1}); break;
      case 'ArrowDown': e.preventDefault(); if (direction.y === 0) setDirection({x: 0, y: 1}); break;
      case 'ArrowLeft': e.preventDefault(); if (direction.x === 0) setDirection({x: -1, y: 0}); break;
      case 'ArrowRight': e.preventDefault(); if (direction.x === 0) setDirection({x: 1, y: 0}); break;
    }
  };

  return (
    <div
      className="floating-mockup-wrapper"
      style={{ perspective: '1000px' }}
    >
      <div 
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="interactive-phone-frame"
      >
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="game-header">
            <span style={{ color: '#00d8ff', fontWeight: 'bold' }}>SCORE:{score}</span>
            <span style={{ color: '#7f00ff' }}>CYBER SNAKE</span>
          </div>
          <div className="game-grid">
            {!gameStarted && !gameOver && (
              <div className="game-overlay">
                <div className="glowing-btn" onClick={startGame}>PLAY NOW</div>
              </div>
            )}
            {gameOver && (
              <div className="game-overlay">
                <span style={{ color: '#ff3366', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px', textShadow: '0 0 10px #ff3366' }}>GAME OVER</span>
                <div className="glowing-btn" onClick={startGame}>RETRY</div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`, width: '100%', height: '100%', gap: '1px' }}>
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                const x = i % GRID_SIZE;
                const y = Math.floor(i / GRID_SIZE);
                const isSnake = snake.some(s => s.x === x && s.y === y);
                const isHead = snake[0].x === x && snake[0].y === y;
                const isFood = food.x === x && food.y === y;
                let cellClass = "game-cell";
                if (isHead) cellClass += " snake-head";
                else if (isSnake) cellClass += " snake-body";
                else if (isFood) cellClass += " snake-food";
                return <div key={i} className={cellClass} />
              })}
            </div>
          </div>
          <div className="mobile-controls">
            <div className="d-pad up" onClick={() => { if (direction.y === 0) setDirection({x: 0, y: -1})}}>▲</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="d-pad left" onClick={() => { if (direction.x === 0) setDirection({x: -1, y: 0})}}>◀</div>
              <div className="d-pad right" onClick={() => { if (direction.x === 0) setDirection({x: 1, y: 0})}}>▶</div>
            </div>
            <div className="d-pad down" onClick={() => { if (direction.y === 0) setDirection({x: 0, y: 1})}}>▼</div>
          </div>
        </div>
      </div>
      <div className="glow-behind-mockup" />
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <Column fillWidth horizontal="center" style={{ overflowX: 'hidden' }}>

      {/* Immersive Hero Section */}
      <section style={{ position: 'relative', width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5%' }}>
        {/* Beautiful AI Generated Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(/images/hero_glow_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35, WebkitMaskImage: '-webkit-linear-gradient(top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', width: '100%', maxWidth: '1200px', marginTop: '64px' }} className="hero-grid">

          {/* Left Text */}
          <Column gap="16" horizontal="start">
            <RevealFx translateY="4" fillWidth horizontal="start">
              <div className="profile-pill hover-card-3d" style={{ padding: '8px 24px 8px 8px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content', marginBottom: '8px' }}>
                <img src={person.avatar} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--neon-cyan)', boxShadow: '0 0 15px rgba(0,216,255,0.5)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text variant="label-default-s" style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hi, I&apos;m</Text>
                  <Text variant="heading-strong-l" style={{ color: '#fff', fontWeight: 800, background: 'linear-gradient(90deg, #fff, #ccc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{person.name}</Text>
                </div>
              </div>
            </RevealFx>

            {home.featured && (
              <RevealFx translateY="8" delay={0.1} fillWidth horizontal="start">
                <Badge background="brand-alpha-weak" paddingX="16" paddingY="8" onBackground="brand-strong" textVariant="label-default-s" arrow={false} href={home.featured.href} target="_blank"
                  style={{ borderRadius: '100px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 216, 255, 0.2)' }}
                >
                  <Row paddingY="2" gap="8" vertical="center">
                    <span className="pulse-dot" />
                    <span>{home.featured.title}</span>
                  </Row>
                </Badge>
              </RevealFx>
            )}

            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start">
              <Heading wrap="balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800 }}>
                Bringing mobile ideas to life with{" "}
                <span className="gradient-text">
                  React Native
                </span>
              </Heading>
            </RevealFx>

            <RevealFx translateY="12" delay={0.3} fillWidth horizontal="start" paddingTop="16" paddingBottom="24">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" style={{ opacity: 0.8, lineHeight: 1.6 }}>
                {home.subline}
              </Text>
            </RevealFx>

            <RevealFx translateY="12" delay={0.4} horizontal="start">
              <Row gap="16" vertical="center">
                <Button id="projects-link" href="#projects" size="l" style={{ background: 'linear-gradient(90deg, #00d8ff, #7f00ff)', border: 'none', boxShadow: '0 10px 30px rgba(0, 216, 255, 0.4)', borderRadius: '100px', padding: '0 32px' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Explore My Work</Text>
                </Button>

                <Button id="about-link" href="#about" variant="secondary" size="l" style={{ borderRadius: '100px', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Flex gap="12" vertical="center">
                    <Avatar style={{ marginLeft: "-0.5rem" }} src={person.avatar} size="s" />
                    <Text>View Resume</Text>
                  </Flex>
                </Button>
              </Row>
            </RevealFx>
          </Column>

          {/* Right Floating Mockup */}
          <RevealFx translateY="16" delay={0.6}>
            <PlayableMockup />
          </RevealFx>

        </div>
      </section>

      {/* Main Content Area */}
      <Column fillWidth gap="xl" horizontal="center" style={{ position: 'relative', zIndex: 10, padding: '0 5%', maxWidth: '1200px' }}>

        {/* About Section */}
        <RevealFx translateY="16" delay={0.2}>
          <Column id="about" fillWidth gap="24" paddingTop="64">
            <Heading as="h2" variant="display-strong-xs" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="section-dot" /> About Me
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-l" style={{ lineHeight: 1.8 }}>
              {about.intro.description}
            </Text>
          </Column>
        </RevealFx>

        {/* Technical Skills Section */}
        <RevealFx translateY="16" delay={0.4}>
          <Column id="skills" fillWidth gap="24" paddingTop="64">
            <Heading as="h2" variant="display-strong-xs" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="section-dot" /> {about.technical.title}
            </Heading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', width: '100%', padding: '16px' }}>
              {about.technical.skills.map((skill, index) => (
                <Flex key={index} className="skill-card hover-card-3d" direction="column" gap="16">
                  <Heading as="h3" variant="heading-strong-m" style={{ color: index === 1 ? '#00d8ff' : '#fff' }}>
                    {skill.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: 1.5 }}>{skill.description}</Text>
                  <div className="card-glow" />
                </Flex>
              ))}
            </div>
          </Column>
        </RevealFx>

        {/* Experience Section */}
        <RevealFx translateY="16" delay={0.6}>
          <Column id="experience" fillWidth gap="32" paddingTop="64">
            <Heading as="h2" variant="display-strong-xs" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="section-dot" /> {about.work.title}
            </Heading>
            <Column gap="32" position="relative" paddingLeft="32" className="timeline-container">
              <div className="timeline-line" />
              {about.work.experiences.map((exp, index) => (
                <Flex key={index} direction="column" gap="8" position="relative" className="timeline-item">
                  <div className="timeline-node" />
                  <Row direction="column" gap="4">
                    <Heading as="h3" variant="heading-strong-l">
                      {exp.role} <span style={{ opacity: 0.5, fontWeight: 400 }}>| {exp.company}</span>
                    </Heading>
                    <Text variant="label-default-m" style={{ color: '#00d8ff', letterSpacing: '0.05em' }}>
                      {exp.timeframe}
                    </Text>
                  </Row>
                  <Column gap="12" className="timeline-content">
                    {exp.achievements.map((achievement, i) => (
                      <Row key={i} gap="12">
                        <Text style={{ color: '#7f00ff', fontSize: '1.2rem', lineHeight: 1 }}>▹</Text>
                        <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: 1.6 }}>{achievement}</Text>
                      </Row>
                    ))}
                  </Column>
                </Flex>
              ))}
            </Column>
          </Column>
        </RevealFx>

        {/* Education Section */}
        {about.studies.display && (
          <RevealFx translateY="16" delay={0.7}>
            <Column id="education" fillWidth gap="32" paddingTop="64">
              <Heading as="h2" variant="display-strong-xs" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="section-dot" /> {about.studies.title}
              </Heading>
              <Column gap="32" position="relative" paddingLeft="32" className="timeline-container">
                <div className="timeline-line" />
                {about.studies.institutions.map((study, index) => (
                  <Flex key={index} direction="column" gap="8" position="relative" className="timeline-item">
                    <div className="timeline-node" />
                    <Row direction="column" gap="4">
                      <Heading as="h3" variant="heading-strong-l">
                        {study.name}
                      </Heading>
                    </Row>
                    <Column gap="12" className="timeline-content">
                      <Row gap="12">
                        <Text style={{ color: '#7f00ff', fontSize: '1.2rem', lineHeight: 1 }}>▹</Text>
                        <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: 1.6 }}>{study.description}</Text>
                      </Row>
                    </Column>
                  </Flex>
                ))}
              </Column>
            </Column>
          </RevealFx>
        )}

        {/* Projects Section */}
        <RevealFx translateY="16" delay={0.8}>
          <Column id="projects" fillWidth gap="32" paddingTop="64" paddingBottom="128">
            <Row vertical="end" horizontal="space-between" fillWidth>
              <Heading as="h2" variant="display-strong-xs" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="section-dot" /> Featured Projects
              </Heading>
              <div className="project-badge">10 Apps Delivered</div>
            </Row>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', width: '100%', padding: '16px' }}>
              {projects.map((project, index) => (
                <Flex
                  key={index}
                  className="project-card hover-card-3d"
                  direction="column"
                  gap="16"
                  onClick={() => project.link && window.open(project.link, '_blank')}
                >
                  <Row gap="12" vertical="center" horizontal="space-between" fillWidth>
                    <Heading as="h3" variant="heading-strong-xl">{project.title}</Heading>
                    {project.link && (
                      <div className="live-badge">LIVE ↗</div>
                    )}
                  </Row>

                  <Text variant="label-default-s" style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {project.timeframe}
                  </Text>

                  <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: 1.6 }}>
                    {project.summary}
                  </Text>

                  <div className="card-glow" />
                </Flex>
              ))}
            </div>
          </Column>
        </RevealFx>

      </Column>

      {/* Global & Scoped CSS injected via styled-jsx alternative */}
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --neon-cyan: #00d8ff;
          --neon-violet: #7f00ff;
        }

        /* Pulse animation for the featured badge */
        .pulse-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--neon-cyan);
          box-shadow: 0 0 10px var(--neon-cyan);
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 216, 255, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(0, 216, 255, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 216, 255, 0); }
        }

        /* Gradient Typography */
        .gradient-text {
          background: linear-gradient(135deg, var(--neon-cyan), var(--neon-violet));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(0, 216, 255, 0.3));
        }

        /* Hover Cards 3D Effect */
        .hover-card-3d {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .hover-card-3d:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 216, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0, 216, 255, 0.1);
          z-index: 2;
        }

        /* Internal Glow that moves on hover */
        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(127, 0, 255, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .hover-card-3d:hover .card-glow {
          opacity: 1;
          animation: spinGlow 10s linear infinite;
        }

        @keyframes spinGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Playable Mockup CSS */
        .interactive-phone-frame {
          width: 280px;
          height: 560px;
          background: #050510;
          border-radius: 40px;
          border: 8px solid #1a1a2e;
          box-shadow: 0 40px 80px rgba(0,216,255,0.1), inset 0 0 15px rgba(0,216,255,0.2);
          position: relative;
          z-index: 2;
          overflow: hidden;
          outline: none;
          cursor: pointer;
        }
        .interactive-phone-frame.active-tilt {
          animation: none;
          box-shadow: 0 40px 80px rgba(0,216,255,0.3), 0 0 60px rgba(127,0,255,0.2), inset 0 0 20px rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.1);
        }
        .phone-notch {
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 100px; height: 25px;
          background: #1a1a2e;
          border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;
          z-index: 10;
        }
        .phone-screen {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at center, #111, #000);
          display: flex; flex-direction: column;
        }
        .game-header {
          padding: 35px 20px 10px; display: flex; justify-content: space-between;
          font-family: monospace; font-size: 0.9rem;
          border-bottom: 1px solid rgba(0,216,255,0.2); background: rgba(0,0,0,0.5);
        }
        .game-grid {
          flex: 1; position: relative; padding: 15px;
          display: flex; align-items: center; justify-content: center;
        }
        .game-cell { border-radius: 2px; }
        .snake-head { background: var(--neon-cyan); box-shadow: 0 0 10px var(--neon-cyan); z-index: 2; position: relative; }
        .snake-body { background: rgba(0, 216, 255, 0.5); }
        .snake-food { background: var(--neon-violet); box-shadow: 0 0 15px var(--neon-violet); border-radius: 50%; }
        .game-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7); display: flex; flex-direction: column;
          align-items: center; justify-content: center; z-index: 5; backdrop-filter: blur(4px);
        }
        .glowing-btn {
          padding: 10px 24px; background: linear-gradient(90deg, #00d8ff, #7f00ff);
          color: white; font-weight: bold; border-radius: 100px; cursor: pointer;
          font-size: 0.8rem; letter-spacing: 2px; transition: all 0.2s;
        }
        .glowing-btn:hover { transform: scale(1.1); box-shadow: 0 0 20px rgba(0,216,255,0.6); }
        .mobile-controls {
          padding: 10px 30px 20px; display: flex; flex-direction: column; gap: 8px;
        }
        .d-pad {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          height: 45px; color: rgba(255,255,255,0.3); cursor: pointer; user-select: none; transition: all 0.1s;
        }
        .d-pad:active { background: rgba(0, 216, 255, 0.3); color: white; transform: scale(0.95); }
        .d-pad.up { width: 60px; margin: 0 auto; }
        .d-pad.down { width: 60px; margin: 0 auto; }
        .d-pad.left { width: 70px; }
        .d-pad.right { width: 70px; }

        .floating-mockup-wrapper {
          position: relative; width: 100%; display: flex; justify-content: center; align-items: center;
        }
        .glow-behind-mockup {
          position: absolute; width: 80%; height: 80%;
          background: radial-gradient(circle, rgba(0, 216, 255, 0.3) 0%, rgba(127, 0, 255, 0.1) 50%, transparent 70%);
          filter: blur(40px); animation: pulseGlow 4s ease-in-out infinite alternate; z-index: 1; pointer-events: none;
        }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        @keyframes pulseGlow { 0% { opacity: 0.5; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1.1); } }

        /* Timelines */
        .timeline-line {
          position: absolute;
          top: 10px;
          bottom: 0;
          left: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--neon-cyan) 0%, var(--neon-violet) 100%);
          opacity: 0.5;
        }

        .timeline-node {
          position: absolute;
          left: -37px;
          top: 8px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: var(--neon-cyan);
          border: 3px solid #111;
          box-shadow: 0 0 10px var(--neon-cyan);
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          margin-top: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .timeline-content:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(127, 0, 255, 0.3);
        }

        /* Section Dots */
        .section-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 2px;
          background: linear-gradient(45deg, var(--neon-cyan), var(--neon-violet));
          transform: rotate(45deg);
        }

        /* Badges */
        .live-badge {
          background: rgba(0, 216, 255, 0.1);
          color: var(--neon-cyan);
          padding: 4px 12px;
          border-radius: 100px;
          font-weight: bold;
          font-size: 0.8rem;
          border: 1px solid rgba(0, 216, 255, 0.3);
          transition: all 0.3s ease;
        }

        .project-card:hover .live-badge {
          background: var(--neon-cyan);
          color: #000;
          box-shadow: 0 0 15px var(--neon-cyan);
        }

        .project-badge {
          padding: 8px 16px;
          background: rgba(127, 0, 255, 0.1);
          border: 1px solid rgba(127, 0, 255, 0.3);
          color: #ddaaff;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.9rem;
        }
      `}} />
    </Column>
  );
}
