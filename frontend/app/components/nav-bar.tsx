import Link from 'next/link';
import Image from 'next/image';


export default function NavBar(){
    return (
        <div className='bg-blue-200 h-12 w-full space-x-9 pl-5'>
            <div className='h-full inline-block align-middle pt-1.5'>
                <Image
                    src='/logo.png'
                    alt='logo'
                    width={51}
                    height={35}
                />
            </div>
            <div className='h-full inline-block'>
                <Link href='/'>
                    <p className=''>Home</p>
                </Link>
            </div>
            <div className='h-full inline-block'>
                <Link href='/find'>
                    <p className=''>Search</p>
                </Link>
            </div>
        </div>
    );
}