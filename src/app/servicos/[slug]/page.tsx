import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { findService, servicesCatalog } from "@/data/servicesCatalog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicesCatalog.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Serviço não encontrado" };

  return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
