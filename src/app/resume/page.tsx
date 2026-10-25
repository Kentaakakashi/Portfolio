import { redirect } from "next/navigation";

export const metadata = {
  title: "Portfolio | Kenta Kakashi",
  description: "Projects and experiments by Kenta Kakashi.",
};

export default function ResumePage() {
  redirect("/");
}
