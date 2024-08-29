'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layout/Layout";
import NameIpPairTable from '@/components/small-component/NameIpPairTable'


const IpManagement = () => {

  return (
    <Layout>
      <NameIpPairTable/>
    </Layout>
  )
};

export default IpManagement;