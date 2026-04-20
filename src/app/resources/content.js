import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Kevin",
  lastName: "Bhutwala",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Senior React Native Developer",
  avatar: "/images/avatar.jpg",
  email: "kevinbhutwala417@gmail.com",
  phone: "+91 8460332500",
  location: "Surat, Gujarat, India",
  timezone: "Asia/Kolkata",
  languages: ["English", "Hindi", "Gujarati"],
};

const newsletter = {
  display: false,
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/kevinbhutwala",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kevin-bhutwala-447686196/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Delivering high-performance mobile experiences</>,
  featured: {
    display: true,
    title: <>Featured Project: <strong className="ml-4">Luminate App</strong></>,
    href: "/#projects",
  },
  subline: (
    <>
      I&apos;m a Senior React Native Developer with 5 years of experience delivering high-performance mobile applications. I specialize in scalable architectures, cross-functional leadership, and seamless UI/UX.
    </>
  ),
};

const about = {
  path: "/#about",
  intro: {
    display: true,
    title: "About Me",
    description: (
      <>
        Senior React Native Developer with 5 years of experience delivering high-performance mobile applications. Experienced in leading cross-functional teams, improving delivery efficiency and building scalable architectures that enhance performance and user experience.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Artoon Solutions Private Limited",
        timeframe: "2023 - PRESENT",
        role: "Senior React-native Developer",
        achievements: [
          <>Mobile development for flagship applications, resulting in a 30% increase in user engagement and a 20% rise in App Store ratings.</>,
          <>Led a cross-functional team, providing technical mentorship that improved productivity and achieved a 15% reduction in project delivery time.</>,
          <>Optimized app architecture, reducing load times by 25% and significantly enhancing user satisfaction through seamless performance.</>,
        ],
        images: [],
      },
      {
        company: "Weingenious Technocrats",
        timeframe: "2021 - 2023",
        role: "React-native Developer",
        achievements: [
          <>Contributed to the development of mobile applications by writing clean and maintainable code, implementing new features and resolving bugs.</>,
          <>Worked closely with senior developers to understand project requirements, share ideas and integrate feedback for continuous learning and improvement.</>,
          <>Conducted performance optimization and testing to enhance the overall user experience and ensure optimal app functionality across various devices.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Veer Narmad South Gujarat University, Surat",
        description: <>Master of Science in Information Technology (MSCIT) | 2017-2021</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages",
        description: <>JavaScript (ES6+), TypeScript</>,
      },
      {
        title: "Frameworks & Libraries",
        description: <>React Native, Redux, Redux-toolkit</>,
      },
      {
        title: "Backend & Integration",
        description: <>REST API Integration, Socket.io, Firebase, Unity Integration</>,
      },
      {
        title: "Tools",
        description: <>Version Control (Git), UI/UX Design Principles, Performance Optimization</>,
      },
    ],
  },
};

const projects = [
  {
    title: "SUPERWORKS HRMS",
    timeframe: "2022 - Present",
    summary: "Cloud HR software for streamlining attendance, leave requests, payroll management, and real-time operational analytics.",
    images: [],
    link: "https://apps.apple.com/in/app/superworks-hrms/id1599503135",
    team: [],
  },
  {
    title: "Super Chat Mobile",
    timeframe: "2021 - Present",
    summary: "Live communication app for organizations offering secure direct and group messaging, project collaboration, and push notifications.",
    images: [],
    link: "https://apps.apple.com/in/app/super-chat-mobile/id1559684141",
    team: [],
  },
  {
    title: "Luminate",
    timeframe: "01/01/2026 - Present",
    summary: "Auth, interactive feed, multimedia Stories, WebRTC group chats. React Native, Redux, Typescript, CSS, Socket, Firebase.",
    images: [],
    link: "",
    team: [],
  },
  {
    title: "MAJX",
    timeframe: "02/02/25 - 10/12/2025",
    summary: "Real-Money Gaming App with Unity engine integration seamlessly launching games. RN, Redux, TypeScript, Socket, Firebase.",
    images: [],
    link: "https://majx.bet/",
    team: [],
  },
  {
    title: "Nexaura",
    timeframe: "06/05/25 - Present",
    summary: "AI-powered platform providing intelligent automation, business insights, and enhanced user engagement.",
    images: [],
    link: "https://nexaura.ai/",
    team: [],
  },
  {
    title: "SpingrBook",
    timeframe: "09/01/24 - 01/01/25",
    summary: "Integrated contacts, phonebook, business card exchange, chat, and calendar. Custom React Native & Node Sockets.",
    images: [],
    link: "",
    team: [],
  },
  {
    title: "Mentor Pilot",
    timeframe: "10/01/23 - 02/01/24",
    summary: "Platform for pre-established student and professional mentor pairs designed to enhance academic excellence.",
    images: [],
    link: "https://apps.apple.com/us/app/imentor/id6470259178",
    team: [],
  },
  {
    title: "THREE Plus Games",
    timeframe: "02/01/23 - 10/01/23",
    summary: "Gaming app delivering a new style of e-sports gaming with excitement and real rewards.",
    images: [],
    link: "https://play.3plusgames.com/now",
    team: [],
  },
  {
    title: "Tailorify",
    timeframe: "02/01/22 - 01/01/23",
    summary: "App for tailors & fashion designers to manage customers, orders, payments, measurements in one place.",
    images: [],
    link: "https://play.google.com/store/apps/details?id=com.tailorify&hl=en_IN",
    team: [],
  },
  {
    title: "Store App",
    timeframe: "07/01/21 - 02/01/22",
    summary: "E-commerce app for Android and iOS providing products browsing and orders handling.",
    images: [],
    link: "",
    team: [],
  }
];

export { person, social, newsletter, home, about, projects };
