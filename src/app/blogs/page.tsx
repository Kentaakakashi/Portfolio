import { redirect } from "next/navigation";

export const metadata = {
  title: "Blog | Kenta Kakashi",
  description: "Personal writing will appear here when published.",
};

export default function BlogPage() {
  redirect("/");
}
