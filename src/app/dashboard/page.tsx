'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const Dashboard = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoInterface>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/user/user');
        if (!res.data.id) {
          router.push('/');
        } else {
          setUserInfo(res.data);
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header userInfo={userInfo} />
      <BodyComponent />
    </div>
  );
};

export default Dashboard;