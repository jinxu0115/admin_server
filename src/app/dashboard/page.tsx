'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    axios.get('/user/user')
      .then(res => {
        if(res.data.id == undefined) router.push('/')
      })
      .catch(error => {
        console.log(error);
        router.push('/')
      })
  }, [])
  
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <BodyComponent/>
    </div>
  )
}
export default Dashboard;