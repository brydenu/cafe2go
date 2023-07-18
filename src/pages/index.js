import Header from 'components/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => (
    router.push('/login')
  ), []);
  
  return (
    <>
      <Header />
      <main className="text-3xl font-bold underline">
        Index
      </main>
    </>
  )
}
