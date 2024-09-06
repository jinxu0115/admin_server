'use client'
import BodyComponent from "@/components/BodyComponent";
import Header from "@/components/Header";
import axios from "../apis/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/Layout/Layout";
import ScreenViewComponent from '@/components/small-component/ScreenViewComponent'


const ScreenMonitor = () => {

  return (
    <Layout title="Screen Monitor">
      <ScreenViewComponent/>
    </Layout>
  )
};

export default ScreenMonitor;