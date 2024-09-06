
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import axios from "../app/apis/axios";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

interface Authority {
    authority: string;
  }

interface UserInfoInterface {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    lastName?: string;
    role?: string;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    enabled?: boolean;
    authorities?: Authority[];
  }

export default function Layout({ title, children }: LayoutProps) {
    const router = useRouter();
    const pathname = usePathname()
    const [userInfo, setUserInfo] = useState<UserInfoInterface>({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/user/user');
                if (!res.data.id) {
                    sessionStorage.removeItem('token');
                    router.push('/');
                } else {
                    setUserInfo(res.data);
                }
            } catch (error) {            
                if(pathname.includes('call-log')){
                    setUserInfo({});
                }else {
                    router.push('/');
                }
                sessionStorage.removeItem('token');
            }
        };
        fetchUserData();
    }, [router]);
    return (
        <div className="min-h-screen bg-white text-black flex min-w-screen">
            <div className="w-80 flex-shrink-0 border-r-[1px] border-[#2e3c56] min-h-screen fixed h-full">
                <Sidebar />
            </div>            
            <div className="flex-grow">
                <Header userInfo={userInfo} />
                <div className="  px-5 py-3 ml-80 mt-20">
                    <div className="text-[#2e3c56] text-3xl mb-5 font-bold">{title}</div>
                    {children}
                </div>
            </div>
        </div>
    )
}