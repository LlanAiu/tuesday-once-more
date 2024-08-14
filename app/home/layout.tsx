import SideBar from "../components/sidebar";

export default function Layout({ children } : { children: React.ReactNode }){
    return (
        <div className='flex w-full h-full'>
            <div className='flex-none w-1/6 h-full'>
                <SideBar />
            </div>
            <div className='flex-1 object-left-top'>{children}</div>
        </div>
    );
}