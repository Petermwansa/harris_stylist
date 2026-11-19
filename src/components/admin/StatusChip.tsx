import ui from "./ui.module.css";

// A small rounded label like "● NEW". Its colour comes from the status:
// ui["chip_new"], ui["chip_confirmed"]… (see ui.module.css)
export default function StatusChip({ status, label }: { status: string; label: string }) {
  return <span className={`${ui.chip} ${ui[`chip_${status}`] ?? ""}`}>{label}</span>;
}