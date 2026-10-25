// thoda zada ts ho gya idhar
// order = keycap layout, 6 per row
export enum SkillNames {
  JS = "js",
  TS = "ts",
  REACT = "react",
  NEXTJS = "nextjs",
  VUE = "vue",
  EXPO = "expo",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  BUN = "bun",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  LINUX = "linux",
  GIT = "git",
  VIM = "vim",
  DOCKER = "docker",
  NGINX = "nginx",
  CLAUDE = "claude",
  CLOUDFLARE = "cloudflare",
  GCP = "gcp",
  AWS = "aws",
  HOME_ASSISTANT = "homeassistant",
  PROXMOX = "proxmox",
  STEAM = "steam",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  /** Optional local artwork for the 3D key; falls back to icon. */
  keyboardIcon?: string;
  /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
  keyboardColor?: string;
  /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
  shortcut?: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/js.svg",
    keyboardColor: "#ff9408",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/ts.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.REACT]: {
    id: 3,
    name: "react",
    label: "React",
    shortDescription: `"use using" 
using use = useUsing("use")`,
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    keyboardIcon: "/assets/keyboard/logos/react.svg",
    keyboardColor: "#00cce8",
  },
  [SkillNames.NEXTJS]: {
    id: 4,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "the drama queen of front-end frameworks, and we stan! 👑📜",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nextjs.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.VUE]: {
    id: 5,
    name: "vue",
    label: "Vue",
    shortDescription:
      "the chill pill for your frontend, it hits different! 🟢😌",
    color: "#41b883",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/vue.svg",
    keyboardColor: "#00b880",
  },
  [SkillNames.EXPO]: {
    id: 6,
    name: "expo",
    label: "Expo",
    shortDescription: "one codebase, every screen, zero Xcode tears 📱✨",
    color: "#000020",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg",
    keyboardIcon: "/assets/keyboard/logos/expo.svg",
    keyboardColor: "#1b1f2e",
  },
  [SkillNames.TAILWIND]: {
    id: 7,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "utility classes hitting different fr fr 🌪️🔥",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    keyboardIcon: "/assets/keyboard/logos/tailwind.svg",
    keyboardColor: "#00bfd8",
  },
  [SkillNames.NODEJS]: {
    id: 8,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
    keyboardColor: "#00952c",
  },
  [SkillNames.EXPRESS]: {
    id: 9,
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    keyboardIcon: "/assets/keyboard/logos/express.svg",
    keyboardColor: "#343638",
  },
  [SkillNames.BUN]: {
    id: 10,
    name: "bun",
    label: "Bun",
    shortDescription: "node but it chugged three energy drinks 🥟⚡",
    color: "#fbf0df",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg",
    keyboardIcon: "/assets/keyboard/logos/bun.svg",
    keyboardColor: "#ec6fa5",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    keyboardIcon: "/assets/keyboard/logos/postgres.svg",
    keyboardColor: "#146888",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    keyboardIcon: "/assets/keyboard/logos/mongodb.svg",
    keyboardColor: "#00c51b",
  },
  [SkillNames.LINUX]: {
    id: 13,
    name: "linux",
    label: "Linux",
    shortDescription: "where 'chmod 777' is the ultimate flex 🔓🙌",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    keyboardIcon: "/assets/keyboard/logos/linux.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.GIT]: {
    id: 14,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
  [SkillNames.VIM]: {
    id: 15,
    name: "vim",
    label: "Vim",
    shortDescription: "exit? In this economy? Ight, imma head out! 🚪🏃",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
    keyboardIcon: "/assets/keyboard/logos/vim.svg",
    keyboardColor: "#009f18",
  },
  [SkillNames.DOCKER]: {
    id: 16,
    name: "docker",
    label: "Docker",
    shortDescription: "The best containerization! 🐳🔥",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    keyboardIcon: "/assets/keyboard/logos/docker.svg",
    keyboardColor: "#009fe8",
  },
  [SkillNames.NGINX]: {
    id: 17,
    name: "nginx",
    label: "NginX",
    shortDescription: "reverse proxy go zoom zoom, sheesh! 🚗💨",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nginx.svg",
    keyboardColor: "#00a20b",
  },
  [SkillNames.CLAUDE]: {
    id: 18,
    name: "claude",
    label: "Claude",
    shortDescription: "my pair programmer that never asks for a coffee break 🤖☕",
    color: "#d97757",
    icon: "https://cdn.simpleicons.org/claude/D97757",
    keyboardIcon: "/assets/keyboard/logos/claude.svg",
    keyboardColor: "#d97757",
  },
  [SkillNames.CLOUDFLARE]: {
    id: 19,
    name: "cloudflare",
    label: "Cloudflare",
    shortDescription: "edge go brrr, my homelab hides behind this orange cloud ☁️🛡️",
    color: "#f38020",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
    keyboardIcon: "/assets/keyboard/logos/cloudflare.svg",
    keyboardColor: "#f38020",
  },
  [SkillNames.GCP]: {
    id: 20,
    name: "gcp",
    label: "Google Cloud",
    shortDescription:
      "cloud computing but make it Google vibes, living rent free! ☁️🔥",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    keyboardIcon: "/assets/keyboard/logos/gcp.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.AWS]: {
    id: 21,
    name: "aws",
    label: "AWS",
    shortDescription:
      "always extra, making everything more complicated, period! 🌐👨‍💻",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
    keyboardIcon: "/assets/keyboard/logos/aws.svg",
    keyboardColor: "#ff9208",
  },
  [SkillNames.HOME_ASSISTANT]: {
    id: 22,
    name: "homeassistant",
    label: "Home Assistant",
    shortDescription: "my house runs on YAML and vibes, lights obey me fr 🏠💡",
    color: "#18bcf2",
    icon: "https://cdn.simpleicons.org/homeassistant/18BCF2",
    keyboardIcon: "/assets/keyboard/logos/homeassistant.svg",
    keyboardColor: "#03a9f4",
  },
  [SkillNames.PROXMOX]: {
    id: 23,
    name: "proxmox",
    label: "Proxmox",
    shortDescription: "a whole datacenter in my closet, power bill said ouch 🖥️🔥",
    color: "#e57000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/proxmox/proxmox-original.svg",
    keyboardIcon: "/assets/keyboard/logos/proxmox.svg",
    keyboardColor: "#e57000",
  },
  [SkillNames.STEAM]: {
    id: 24,
    name: "steam",
    label: "Steam",
    shortDescription: "\"just one more match\" at 3am, every night 🎮🌙",
    color: "#66c0f4",
    icon: "https://cdn.simpleicons.org/steam/66C0F4",
    keyboardIcon: "/assets/keyboard/logos/steam.svg",
    keyboardColor: "#1b2838",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2025",
    endDate: "Present",
    title: "Independent Developer",
    company: "Personal Projects",
    description: [
      "Building Theo AI, an Android assistant focused on natural conversation, tutoring, and mobile-first interaction.",
      "Developing and customizing a 3D portfolio while learning modern web development and deployment.",
      "Exploring app architecture, APIs, Git, and practical debugging by shipping projects in public.",
    ],
    skills: [SkillNames.TS, SkillNames.REACT, SkillNames.NEXTJS, SkillNames.GIT],
  },
  {
    id: 2,
    startDate: "2024",
    endDate: "Present",
    title: "Computer Science Learner",
    company: "Self-directed learning",
    description: [
      "Learning software development through hands-on experiments and open-source projects.",
      "Practicing how to break down features, understand existing code, and fix real build and integration issues.",
    ],
    skills: [SkillNames.JS, SkillNames.TS, SkillNames.LINUX, SkillNames.GIT],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
