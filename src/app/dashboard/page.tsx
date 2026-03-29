import AppLayout from '@/components/AppLayout';
import { auth } from '@/auth';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Member';

  return (
    <AppLayout>
      <DashboardClient userName={userName} />
    </AppLayout>
  );
}
