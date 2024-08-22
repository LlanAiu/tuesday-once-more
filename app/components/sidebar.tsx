'use client'

import clsx from 'clsx';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function SideBar(){
    const pathName = usePathname();

    const links = [
        {name: 'Home', href: '/home'},
        {name: 'Review', href: '/home/review'},
        {name: 'Problem Set', href: '/home/problems'},
        {name: 'Topics', href: '/home/topics'}
    ]
    
    return (
        <div className='space-y-1 relative w-full h-full bg-slate-50'>
            {links.map((link : {name: string, href: string}) => {
                return (
                    <Link 
                        key={link.name}
                        href={link.href}
                        className={clsx('block py-2 hover:bg-slate-300', {
                            'bg-blue-300 hover:bg-blue-400': pathName === link.href
                        })}
                    >
                        <p className='text-center text-ellipsis'>{link.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}