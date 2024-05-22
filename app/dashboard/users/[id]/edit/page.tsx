import Form from '@/app/ui/users/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchUserById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit User',
}

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id
    const [user, users] = await Promise.all([
        fetchUserById(id),
        fetchUsers(),
    ]); 
    if (!user) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users' },
                    {
                        label: 'Edit User',
                        href: `/dashboard/users/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form user={user} />
        </main>
    );
}