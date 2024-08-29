'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layout/Layout";
import ScreenViewComponent from '@/components/small-component/ScreenViewComponent'


const ScreenMonitor = () => {

  return (
    <Layout>
      <ScreenViewComponent/>
    </Layout>
  )
};

export default ScreenMonitor;