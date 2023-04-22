import Header from 'components/header/header';
import { useRouter } from 'next/router';

export default function Home() {
  // const router = useRouter();

  // router.push('/login');
  return (
    <>
      <Header />
      <main className="text-3xl font-bold underline">
        Index
      </main>
    </>
  )
}
