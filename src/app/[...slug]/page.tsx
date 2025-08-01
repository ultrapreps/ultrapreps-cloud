import { redirect } from 'next/navigation';
import CatchAllContent from './CatchAllContent';

// Map of old routes to new ones
const routeMap: Record<string, string> = {
  // Product pages
  'features': '/dashboard',
  'pricing': '/dashboard',
  'demos': '/dashboard',
  'ultraai': '/dashboard',
  
  // Solution pages
  'solutions/students': '/dashboard',
  'solutions/parents': '/parent-dashboard',
  'solutions/teachers': '/teacher-dashboard',
  'solutions/schools': '/superintendent-dashboard',
  'solutions/districts': '/superintendent-dashboard',
  
  // Resource pages
  'help': '/dashboard',
  'blog': '/community',
  'api-docs': '/dashboard',
  'status': '/dashboard',
  'tutorials': '/dashboard',
  
  // Company pages
  'about': '/dashboard',
  'careers': '/dashboard',
  'contact': '/dashboard',
  'press': '/community',
  'partners': '/dashboard'
};

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const fullPath = resolvedParams.slug.join('/');
  const redirectTo = routeMap[fullPath];

  // Auto-redirect if we have a mapping
  if (redirectTo) {
    redirect(redirectTo);
  }

  return <CatchAllContent />;
}