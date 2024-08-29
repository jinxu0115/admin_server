import {useEffect, useState} from "react"

export default function ScreenViewComponent(){
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [viewMode, setViewMode] = useState('daily')

    function selectViewMode(mode){
        setViewMode(mode)
    }
    return (
        <div>
            <div className="flex justify-end">
                <button onClick={() => selectViewMode("daily")} className={`w-20 px-2 hover:bg-[#222e44] hover:text-white transition-all duration-200 py-1 border-[1px] border-[#222e44] border-r-0 rounded-l-md ${viewMode == 'daily' ? 'bg-[#222e44] text-white' : 'text-[#222e44] bg-white '}`}>Daily</button>
                <button onClick={() => selectViewMode('weely')} className={`w-20 px-2 hover:bg-[#222e44] hover:text-white transition-all duration-200 py-1 border-[1px] border-[#222e44] border-r-0 ${viewMode == 'weely' ? 'bg-[#222e44] text-white' : 'text-[#222e44] bg-white'}`}>Weekly</button>
                <button onClick={() => selectViewMode('monthly')} className={`w-20 px-2 hover:bg-[#222e44] hover:text-white transition-all duration-200 py-1 border-[1px] border-[#222e44] rounded-r-md  ${viewMode == 'monthly' ? 'bg-[#222e44] text-white' : 'text-[#222e44] bg-white'}`}>Monthly</button>
                <button onClick={() => selectViewMode('custom')} className={`w-32 px-2 hover:bg-[#222e44] hover:text-white transition-all duration-200 py-1 border-[1px] border-[#222e44] ml-2 rounded-md ${viewMode == 'custom' ? 'bg-[#222e44] text-white' : 'text-[#222e44] bg-white'}`}>Date Range</button>
            </div>
        </div>
    )
}