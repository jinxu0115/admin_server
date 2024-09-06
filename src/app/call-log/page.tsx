'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/Layout/Layout";
import CallLogTable from '@/components/small-component/CallLogTable'


const CallLogPage = () => {

  return (
    <Layout title="Video/Voice Call Logs">
      <CallLogTable/>
    </Layout>
  )
};

export default CallLogPage;