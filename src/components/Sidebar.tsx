import Link from 'next/link';
import SidebarItem from '@/components/small-component/SidebarItem';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Sidebar() {
    const pathname = usePathname();
    
    return (
        <div className="bg-[#222e44] h-full">            
            <div className="flex items-center h-20 justify-center">
                <img className="h-12" src="/logo.png" alt="Logo" />
                <div className="ml-3 text-3xl font-bold text-white">IMS</div>
            </div>
            <div className="p-5">
                <SidebarItem
                    url="/call-log"
                    title="Video/Voice Call"                    
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 fill-white stroke-[#2e3c56]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    }
                    selected={pathname.includes('call-log')}
                />
                <SidebarItem
                    url="/screen-monitor"
                    title="Screen Monitor"                    
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 fill-white stroke-[#2e3c56]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                        </svg>
                    }
                    selected={pathname.includes('screen-monitor')}
                />
                <SidebarItem
                    url="/ip-management"
                    title="Ip Management"                    
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 fill-white stroke-[#2e3c56]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                        </svg>
                    }                    
                    selected={pathname.includes('ip-management')}
                />
            </div>
        </div>
    )
}
