const config = {
  title: "Kenta Kakashi | Builder, Developer & CS Student",
  description: {
    long: "I'm Kenta Kakashi — a computer science student and independent builder exploring Android AI, thoughtful web experiences, and useful tools. This is a living portfolio of projects I'm building, learning from, and improving in public.",
    short: "Kenta Kakashi — computer science student building Android AI tools, web experiences, and practical software.",
  },
  keywords: [
    "Kenta Kakashi", "Kentaakakashi", "computer science student",
    "Android development", "AI assistant", "Gemini", "React",
    "Next.js", "TypeScript", "open source", "software projects",
  ],
  author: "Kenta Kakashi",
  email: "",
  site: "https://github.com/Kentaakakashi/Portfolio",
  githubUsername: "Kentaakakashi",
  githubRepo: "Portfolio",
  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    github: "https://github.com/Kentaakakashi",
  },
};
export { config };
