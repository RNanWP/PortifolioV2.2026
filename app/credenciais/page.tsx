import type { Metadata } from "next";
import CredentialsGallery from "./CredentialsGallery";

export const metadata: Metadata = {
  title: "Credenciais — Renan Oliveira",
  description:
    "Formação acadêmica, certificações profissionais e cursos de Renan Oliveira.",
  alternates: {
    canonical: "/credenciais",
  },
};

export default function CredentialsPage() {
  return <CredentialsGallery />;
}
