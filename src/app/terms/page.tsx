import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "How appointments, bespoke commissions and purchases with harris_stylist work.",
};

export default function TermsPage() {
  return <LegalPage doc={termsAndConditions} />;
}