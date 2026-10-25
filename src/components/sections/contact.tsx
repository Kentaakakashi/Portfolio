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
import { SiGithub, SiDiscord } from "react-icons/si";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-[70vh] max-w-7xl mx-auto flex flex-col justify-center">
      <SectionHeader
        id="contact"
        className="relative mb-10"
        title={<>LET&apos;S CONNECT</>}
        desc="Have an idea, question, or collaboration in mind? Send me a message."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-[1] mx-4 items-start">
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Contact Form</CardTitle>
            <CardDescription>
              Please contact me directly at {config.email} or drop your info here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-3">
          <a href={config.social.github} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-lg border px-5 py-3 font-mono transition-colors hover:bg-primary/10">
            <SiGithub size={22} /> GitHub
          </a>
          <a href={config.social.discord} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-lg border px-5 py-3 font-mono transition-colors hover:bg-primary/10">
            <SiDiscord size={22} /> Discord
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
