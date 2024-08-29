import Link from 'next/link'
export default function SidebarItem({url, title, svg, selected}){
    return (      
        <Link href={url} className="flex items-center gap-1">  
            <div className={`flex items-center w-full p-2 hover:bg-[#171e2b] cursor-pointer rounded-md my-2 ${selected && "bg-[#171e2b]"}`}>
                {svg}
                <button className="text-white ml-2">{title}</button>
            </div>
        </Link>
    )
}