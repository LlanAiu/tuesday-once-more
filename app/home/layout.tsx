import SideBar from "../components/sidebar";

export default function Layout({ children } : { children: React.ReactNode }){
    return (
        <div className='w-screen min-h-screen h-max'>
            <div className='fixed w-48 h-full'>
                <SideBar />
            </div>
            <div className='pl-48 w-full object-left-top'>{children}</div>
        </div>
    );
}