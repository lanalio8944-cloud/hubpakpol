import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntryById, normalizeUrl, getAllIds } from "@/lib/urls";
import NotepadView from "@/components/NotepadView";
import AdSlot from "@/components/AdSlot";
import AdBlockDetector from "@/components/ads/AdBlockDetector";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = getEntryById(id);
  if (!entry) return { title: "Tidak ditemukan" };
  return {
    title: id + " — Asupan",
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return getAllIds().map((id) => ({ id }));
}

export const dynamic = "force-static";
export const revalidate = false;

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const entry = getEntryById(id);
  if (!entry) notFound();

  const urls = entry.urls.map(normalizeUrl).filter(Boolean);

  return (
    <main className="app">
      <header>
        <h1>Asupan</h1>
        <div className="meta-head">
          <span>ID: {entry.id}</span>
        </div>
      </header>

      {/* BARU: notice adblock, muncul hanya jika terdeteksi */}
      <AdBlockDetector />

      <AdSlot />

      <NotepadView id={entry.id} urls={urls} />
    </main>
  );
}
