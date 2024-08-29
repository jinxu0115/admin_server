
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import axios from "../app/apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({children}){
    const router = useRouter();
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
            sessionStorage.removeItem('token');
            router.push('/');
        }
        };

        fetchUserData();
    }, [router]);
    return (
        <div className="min-h-screen bg-white text-black flex min-w-screen">
            <div className="w-80 flex-shrink-0 border-r-[1px] border-[#2e3c56] min-h-screen">
                <Sidebar />
            </div>            
            <div className="flex-grow">
                <Header userInfo={userInfo} />
                <div className="  px-5 py-3">
                    {children}
                </div>
            </div>
        </div>
    )
}