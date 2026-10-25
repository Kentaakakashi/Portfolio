const config = {
  title: "Naren Kumar | Builder, Developer & CS Student",
  description: {
    long: "I'm Naren Kumar (aka Kenta Kakashi) — a computer science student and independent builder exploring Android AI, thoughtful web experiences, and useful tools. This is a living portfolio of projects I'm building, learning from, and improving in public.",
    short: "Naren Kumar — computer science student, also known online as Kenta Kakashi building Android AI tools, web experiences, and practical software.",
  },
  keywords: [
    "Naren Kumar", "Kenta Kakashi", "Kentaakakashi", "computer science student",
    "Android development", "AI assistant", "Gemini", "React",
    "Next.js", "TypeScript", "open source", "software projects",
  ],
  author: "Naren Kumar",
  email: "narenkumar9500@gmail.com",
  site: process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/Kentaakakashi/Portfolio",
  githubUsername: "Kentaakakashi",
  githubRepo: "Portfolio",
  get ogImg() {
    return "https://raw.githubusercontent.com/Kentaakakashi/Portfolio/main/public/assets/projects-screenshots/kenta/portfolio.svg";
  },
  social: {
    github: "https://github.com/Kentaakakashi",
    discord: "https://discord.com/users/1105394446230638623",
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
  },
};
export { config };
