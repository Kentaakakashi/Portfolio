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
            An Android assistant with personality — built to feel like a capable teammate, not a sterile chatbot.
          </TypographyP>
          <TypographyP className="font-mono">
            Theo is my ongoing mobile AI project. The current direction uses Gemini as its primary model, with a focus on helpful conversation, tutoring, and a more natural assistant experience.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">What I'm exploring</TypographyH3>
          <p className="font-mono mb-2">
            Native Android integration, conversational UX, screen-aware assistance, persistent context, and reliable user-controlled automation. These are active development goals, not claims that every feature is finished.
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
            A security-minded developer-tools project, being shaped around making APIs easier to inspect and trust.
          </TypographyP>
          <TypographyP className="font-mono">
            API Sentinel is listed as a work in progress. This portfolio will get a concrete feature breakdown, screenshots, and a source link once the public version is ready.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">Status</TypographyH3>
          <p className="font-mono mb-2">
            In development. No invented user counts, performance claims, or production metrics — just the project as it stands.
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
            A melancholic fantasy RPG about a mysterious wanderer who has forgotten who they are.
          </TypographyP>
          <TypographyP className="font-mono">
            An early-stage game project exploring atmosphere, pixel-art presentation, character design, and world-building. The focus is on creating a cohesive, emotionally driven game rather than rushing into a large production.
          </TypographyP>
          <TypographyH3 className="my-4 mt-8">Current status</TypographyH3>
          <p className="font-mono mb-2">
            Concept and asset exploration. Gameplay systems, world maps, and final implementation are still being developed.
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
            The Black Dragons community bot and its supporting systems.
          </TypographyP>
          <TypographyP className="font-mono">
            A JavaScript project connected to the Black Dragons community, using Oracle for tokens and Firebase for its database.
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
            The official web experience for the Black Dragons community.
          </TypographyP>
          <TypographyP className="font-mono">
            A React, TypeScript, and Vite site with Discord sign-in, Roblox account ownership verification, recruitment applications, events, announcements, and community pages.
          </TypographyP>
          <ProjectsLinks repo={this.github} />
        </div>
      );
    },
  },
];
export default projects;
