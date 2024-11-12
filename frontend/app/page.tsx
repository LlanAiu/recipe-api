import Link from 'next/link';


export default function Home() {
  return (
    <div className='pt-20 pb-20 w-screen h-screen flex flex-col justify-center text-center'>
      <h1 className='flex-auto text-5xl'>Here's the deal:</h1>
      <h1 className='flex-auto text-5xl'>We're gonna <b>Let You Cook</b></h1>
      <h2 className='flex-auto text-4xl'>Don't burn down the kitchen please...</h2>

      <div className='flex-initial w-52 m-auto border h-max rounded-2xl bg-slate-100 hover:bg-blue-200'>
        <Link href={'/find'}>
          <p className='text-3xl py-2'>Bet.</p>
        </Link>
      </div>
    </div>
  );
}
