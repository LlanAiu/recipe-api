'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


export default function NavBar(){
    const pathname: string = usePathname();

    return (
        <div className='h-16 w-full space-x-12 pl-6 content-center border-b-2 border-gray-300'>
            <div className='inline-block align-middle'>
                <Image
                    src='/logo.png'
                    alt='logo'
                    width={61}
                    height={42}
                />
            </div>
            <div className='inline-block h-max'>
                <div className={clsx({
                    'py-1 px-1.5 rounded-xl hover:quaternary-bg': true,
                    'quaternary-bg': pathname === '/',
                })}>
                    <Link href='/'>
                        <p className='w-max'><b>Home</b></p>
                    </Link>
                </div>
            </div>
            <div className='inline-block'>
                <div className={
                    clsx({
                        'py-1 px-1.5 rounded-xl hover:quaternary-bg': true,
                        'quaternary-bg': pathname === '/find',
                    })
                }>
                    <Link href='/find'>
                        <p className='w-max'><b>Search</b></p>
                    </Link>
                </div>
            </div>
        </div>
    );
}