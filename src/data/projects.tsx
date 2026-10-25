import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  electron: brand("Electron", "electron-mono.svg"),
  vite: brand("Vite", "vite-mono.svg"),
  astro: brand("Astro", "astro-mono.svg"),
  sqlite: brand("SQLite", "sqlite-mono.svg"),
  ffmpeg: brand("FFmpeg", "ffmpeg-mono.svg"),
  ollama: brand("Ollama", "ollama-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
  android: {
    title: "Android",
    bg: "#173b2c",
    fg: "#a3e635",
    icon: <span className="text-xs font-bold">AND</span>,
  },
  kotlin: {
    title: "Kotlin",
    bg: "#29204f",
    fg: "#c4b5fd",
    icon: <span className="text-xs font-bold">Kt</span>,
  },
  gemini: {
    title: "Gemini",
    bg: "#142747",
    fg: "#93c5fd",
    icon: <span className="text-xs font-bold">G</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "theo-ai",
    category: "Android · AI assistant",
    title: "Theo AI",
    src: "/assets/projects-screenshots/kenta/theo.svg",
    screenshots: [],
    github: "https://github.com/Kentaakakashi/Theo-AI",
    live: "#",
    skills: { frontend: [PROJECT_SKILLS.android, PROJECT_SKILLS.kotlin], backend: [PROJECT_SKILLS.gemini] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An Android AI sidekick with main-character energy — less “Dear valued user,” more “alright, let’s fix this.”
          </TypographyP>
          <TypographyP className="font-mono">
            Theo is my attempt to build the kind of assistant I’d actually want on my phone: useful, conversational, a little chaotic, and capable of explaining things without making me feel like I accidentally opened a university textbook. Gemini is the primary model, with the experience focused on everyday help, learning, and a personality that feels more teammate than talking search bar.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">What I'm exploring</TypographyH3>
          <p className="font-mono mb-2">
            The long game: native Android integration, screen-aware help, context that survives beyond one chat, and automation that stays under the user's control. Basically, the dream is “handle the boring steps” — not “give a robot the keys to the kingdom.” These are active development goals, so the mission is still very much in progress.
          </p>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "api-sentinel",
    category: "Developer tools · In progress",
    title: "API Sentinel",
    src: "/assets/projects-screenshots/kenta/api-sentinel.svg",
    screenshots: [],
    live: "#",
    skills: { frontend: [], backend: [] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            APIs are great until one mysterious response ruins your afternoon. API Sentinel is a developer-tools concept aimed at making API behaviour easier to inspect, reason about, and trust — because “it works on my machine” is not a monitoring strategy.
          </TypographyP>
          <TypographyP className="font-mono">
            The idea is to give developers a clearer view of what their APIs are doing and make debugging feel less like interrogating a haunted terminal. The exact public feature set is still taking shape, so this card will get more specifics when the project has a shareable build.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">Status</TypographyH3>
          <p className="font-mono mb-2">
            Status: cooking. The security cape is on, the roadmap is being sharpened, and no imaginary “10 million requests secured” statistics were harmed in the making of this portfolio.
          </p>
        </div>
      );
    },
  },
  {
    id: "god-who-forgot",
    category: "Indie game · Early development",
    title: "The God Who Forgot",
    src: "/assets/projects-screenshots/kenta/god-who-forgot.svg",
    screenshots: [],
    live: "#",
    skills: { frontend: [], backend: [] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A melancholic pixel-art fantasy RPG where the protagonist has forgotten who they are. Which is inconvenient, because apparently the universe still expects them to have a plot.
          </TypographyP>
          <TypographyP className="font-mono">
            The God Who Forgot is being shaped around atmosphere, lonely roads, memorable places, character sprites, and the slow reveal of a world with more questions than answers. Think wistful fantasy, pixel-art soul, and lore that probably should come with a “do not emotionally attach” warning. The goal is to build a cohesive experience first, rather than speedrun a giant RPG and drown in unfinished maps.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">Current status</TypographyH3>
          <p className="font-mono mb-2">
            Current chapter: concept and asset exploration. Characters, maps, NPC-filled places, and gameplay systems are still being figured out. The gods may be missing, but the scope creep is very much alive.
          </p>
        </div>
      );
    },
  },
  {
    id: "black-dragons",
    category: "Discord bot · Community tools",
    title: "Black Dragons",
    src: "/assets/projects-screenshots/kenta/black-dragons.svg",
    screenshots: [],
    github: "https://github.com/kentakakashi/Black_Dragons",
    live: "#",
    skills: { frontend: [PROJECT_SKILLS.js], backend: [PROJECT_SKILLS.firebase] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A JavaScript-powered bot for the Black Dragons community — the digital dragon that helps keep the server’s systems breathing. Less mythical fire-breathing, more tokens, database calls, and making sure the backend doesn’t spontaneously become a side quest.
          </TypographyP>
          <TypographyP className="font-mono">
            The project uses Oracle for tokens and Firebase for its database, tying the bot into the community’s wider tooling. It’s the behind-the-scenes kind of work: not always flashy in a screenshot, but very noticeable when the automation is missing and everyone starts asking “yo, is the bot down?”
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "black-dragon-web",
    category: "Community platform · Web",
    title: "Black Dragons Website",
    src: "/assets/projects-screenshots/kenta/black-dragon-web.svg",
    screenshots: [],
    github: "https://github.com/kentakakashi/Black-Dragon-web",
    live: "#",
    skills: { frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts], backend: [PROJECT_SKILLS.firebase] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A home base for the Black Dragons community — with more going on than a landing page and a dramatic dragon logo. It brings member identity, clan activity, recruitment, events, announcements, and community information into one web experience.
          </TypographyP>
          <TypographyP className="font-mono">
            Built with React, TypeScript, and Vite, the site includes Discord authentication, Roblox account ownership verification, recruitment applications, events, announcements, staff and community pages, and member-facing information. It also keeps sensitive actions server-side and treats the bot’s canonical player data as read-only. Translation: the website can look cool without being allowed to casually rewrite the clan’s stats like an admin with butterfingers.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "northstar",
    category: "AI · Goal planning",
    title: "NorthStar",
    src: "/assets/projects-screenshots/kenta/northstar.svg",
    screenshots: [],
    github: "https://github.com/Kentaakakashi/Northstar",
    live: "https://northstar-path.netlify.app",
    skills: { frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.vite, PROJECT_SKILLS.motion], backend: [PROJECT_SKILLS.gemini] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Know where you’re going. And if the route collapses halfway there, find another one. NorthStar is an adaptive life-planning system for turning a big, fuzzy ambition into a destination with multiple possible routes.
          </TypographyP>
          <TypographyP className="font-mono">
            Instead of throwing a motivational quote at a complicated life problem and calling it a day, NorthStar starts with what you actually want, examines real-world constraints, explores trade-offs, and maps goals into routes, milestones, and next actions. When reality changes, the plan should adapt instead of guilt-tripping you with a checklist from three weeks ago. The guiding principle: AI can propose the route; you still drive.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "discord-widget",
    category: "Web · Discord integration",
    title: "Discord Widget",
    src: "/assets/projects-screenshots/kenta/discord-widget.svg",
    screenshots: [],
    live: "#",
    skills: { frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts], backend: [] },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A little bridge between a website and the Discord-shaped corner of the internet where the community actually hangs out.
          </TypographyP>
          <TypographyP className="font-mono">
            The goal is to make community presence feel like part of the site instead of a lonely “Join our Discord” button abandoned in the footer. This card represents my Discord-widget work; the public source/demo link can be attached once the standalone project URL is ready.
          </TypographyP>
        </div>
      );
    },
  },
];
export default projects;
