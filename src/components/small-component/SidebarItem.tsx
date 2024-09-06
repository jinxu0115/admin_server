import Link from 'next/link'

interface SidebarItemProps {
    url: string;
    title: string;
    svg: JSX.Element;
    selected?: boolean;
}

export default function SidebarItem({ url, title, svg, selected }: SidebarItemProps) {
    return (      
        <Link href={url} className="flex items-center gap-1">  
            <div className={`flex items-center w-full p-2 hover:bg-[#171e2b] cursor-pointer rounded-md my-2 ${selected && "bg-[#171e2b]"}`}>
                {svg}
                <button className="text-white ml-2">{title}</button>
            </div>
        </Link>
    )
}