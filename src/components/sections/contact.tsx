import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { SiGithub } from "react-icons/si";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-[70vh] max-w-7xl mx-auto flex flex-col justify-center">
      <SectionHeader
        id="contact"
        className="relative mb-10"
        title={<>LET&apos;S CONNECT</>}
        desc="Building something interesting? Find me on GitHub."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 z-[1] mx-4">
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Open source, open conversations.</CardTitle>
            <CardDescription>
              I'm sharing projects as I build and learn. GitHub is the best public place to follow along or get in touch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href={config.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border px-5 py-3 font-mono transition-colors hover:bg-primary/10"
            >
              <SiGithub size={22} />
              github.com/Kentaakakashi
            </a>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
