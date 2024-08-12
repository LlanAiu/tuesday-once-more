import SideBar from "../components/sidebar";

export default function Layout({ children } : { children: React.ReactNode }){
    return (
        <div>
            <div>
                <SideBar />
            </div>
            <div>{children}</div>
        </div>
    );
}