import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How harris_stylist collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}