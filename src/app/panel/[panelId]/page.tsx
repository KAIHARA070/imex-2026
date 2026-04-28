import { PANELS } from '@/lib/constants';
import PanelView from '@/components/imex/PanelView';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ panelId: string }>;
}

export default async function PanelPage({ params }: PageProps) {
  const { panelId } = await params;
  if (!PANELS[panelId]) notFound();
  return <PanelView panelId={panelId} />;
}
