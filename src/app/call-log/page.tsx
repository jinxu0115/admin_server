'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layout/Layout";
import CallLogTable from '@/components/small-component/CallLogTable'


const CallLogPage = () => {

  return (
    <Layout>
      <CallLogTable/>
    </Layout>
  )
};

export default CallLogPage;