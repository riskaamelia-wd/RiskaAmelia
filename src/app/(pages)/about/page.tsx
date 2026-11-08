import type { Metadata } from "next";
import { ProfilePage } from "@/features/profile/components/ProfilePage";
export const metadata: Metadata = {
  title: "About",
  description: "Riska Amelia’s software engineering experience and education.",
};
export default function Page() {
  return <ProfilePage />;
}
