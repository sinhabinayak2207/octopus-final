import AdminPanel from '@/components/admin/AdminPanel';
import { Metadata } from 'next';

// Make this page dynamic to handle authentication and admin access
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Manage product images and content',
};

export default function AdminPage() {
  return <AdminPanel />;
}
