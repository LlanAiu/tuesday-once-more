import Link from "next/link";

export default function SideBar(){
    const links = [
        {name: 'Home', href: '/home'},
        {name: 'Review', href: '/home/review'},
        {name: 'Problem Set', href: '/home/problems'}
    ]
    
    return (
        <div className='space-y-1 relative w-full h-full bg-slate-200'>
            {links.map((link : {name: string, href: string}) => {
                return (
                    <Link 
                        key={link.name}
                        href={link.href}
                        className='block py-2 rounded-md hover:bg-slate-300'
                    >
                        <p className='text-center text-ellipsis'>{link.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}