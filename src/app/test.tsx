import { createAdminClient } from '@/lib/appwrite';

export default async function HomePage() {
  const client = await createAdminClient();
  console.log(client.account);

  return (
    <main className='gap-4 p-8'>
      <p>Jira Clone</p>
    </main>
  );
}
