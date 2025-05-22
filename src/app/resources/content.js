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
  location: "Asia/Kolkata",
  languages: ["English", "Hindi", "Gujarati"],
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>I occasionally write about mobile development and new trends in React Native.</>,
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
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bringing mobile ideas to life with code and creativity</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Retail Watch App</strong></>,
    href: "/work/watch-business-retail-app",
  },
  subline: (
    <>
      I'm Kevin, a React Native developer with 4+ years of experience building cross-platform apps.
      <br /> I love building sleek, high-performance apps and solving complex UI challenges.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Kevin is an experienced React Native developer based in India, passionate about crafting
        smooth, scalable, and modern mobile applications. He has a strong eye for detail and thrives
        in startup environments where speed and quality matter.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "ABC Tech Solutions",
        timeframe: "2021 - Present",
        role: "Senior React Native Developer",
        achievements: [
          <>Built and maintained 10+ cross-platform apps with 100k+ downloads.</>,
          <>Led migration to TypeScript and improved developer velocity by 25%.</>,
        ],
        images: [],
      },
      {
        company: "MobileCraft",
        timeframe: "2019 - 2021",
        role: "React Native Developer",
        achievements: [
          <>Optimized performance of large-scale mobile app, improving FPS and load time.</>,
          <>Collaborated with designers and back-end teams to launch 4 new client apps.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "XYZ Institute of Technology",
        description: <>Completed Bachelor's in Computer Science.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "React Native",
        description: <>Built apps for retail, fintech, social platforms using React Native core and Expo.</>,
        images: [],
      },
      {
        title: "TypeScript",
        description: <>Strong experience in TypeScript for React Native and web projects.</>,
        images: [],
      },
      {
        title: "Firebase & REST APIs",
        description: <>Integrated real-time databases, auth, and push notifications in multiple apps.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Sharing thoughts on mobile tech...",
  description: `Read what ${person.name} has been building and learning recently.`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `A collection of apps and experiments by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Snapshots – ${person.name}`,
  description: `A collection of screenshots and moments from my work life`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
