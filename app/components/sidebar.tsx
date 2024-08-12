import Link from "next/link";

export default function SideBar(){
    const links = [
        {name: 'Home', href: '/home'},
        {name: 'Review', href: '/home/review'},
        {name: 'Problem Set', href: '/home/problems'}
    ]
    
    return (
        <>
            {links.map((link : {name: string, href: string}) => {
                return (
                    <Link 
                        key={link.name}
                        href={link.href}
                    >
                        <p>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}