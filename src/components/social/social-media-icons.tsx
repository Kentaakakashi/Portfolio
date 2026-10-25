"use client";

import React from "react";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import { config } from "@/data/config";
import Link from "next/link";

const SocialMediaButtons = () => {
  return (
    <div className="z-10">
      <Link href={config.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <Button variant="ghost">
          <SiGithub size={24} color="#fff" />
        </Button>
      </Link>
    </div>
  );
};

export default SocialMediaButtons;
