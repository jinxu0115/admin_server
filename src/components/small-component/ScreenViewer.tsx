'use client'
import { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from '../../app/apis/axios';
import { useRouter } from 'next/navigation';

interface ScreenViewerProps {
    selectedDate: string | null;
    selectedUser: string | null;
}

interface TimeRange {
    start: Date;
    end: Date;
}

interface ScreenInfo {
    fromDate: string;
    mouseCount: number;
    keyCount: number;
    urls: string[];
    fileLocation: string;
    duration: number;
}

export default function ScreenViewer({ selectedDate, selectedUser }: ScreenViewerProps) {
    const router = useRouter();

    const [screenInfors, setScreenInfors] = useState<ScreenInfo[]>([]);
    const [minIntervals, setMinIntervals] = useState<TimeRange[]>([]);
    const [hourIntervals, setHourIntervals] = useState<TimeRange[]>([]);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>('');

    useEffect(() => {
        if (selectedUser == null) return;
        if (selectedDate != null) {
            const date = new Date(selectedDate);
            
            axios.post('/detect/video', {
                date: formatDateToYYYYMMDD(date),
                name: selectedUser
            })
            .then(res => {
                setScreenInfors(res.data);
            })
            .catch(error => {
                router.push('/');
            });
        }
    }, [selectedDate, selectedUser]);

    function getTenMinuteIntervals(date: Date): TimeRange[] {
        const intervals: TimeRange[] = [];
        const start = new Date(date);
        start.setHours(0, 0, 0, 0); // Start at the beginning of the day
    
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // End of the day for comparison

        while (start <= endOfDay) {
            const end = new Date(start);
            end.setMinutes(start.getMinutes() + 10); // Add 10 minutes to get the end time
    
            intervals.push({
                start: new Date(start), // Store the start time
                end: new Date(end),     // Store the end time
            });
    
            start.setMinutes(start.getMinutes() + 10); // Move to the next 10-minute interval
        }
    
        return intervals;
    }

    function getAnHourInterval(date: Date): TimeRange[] {
        const intervals: TimeRange[] = [];
        const start = new Date(date);
        start.setHours(0, 0, 0, 0); // Start at the beginning of the day
    
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // End of the day for comparison

        while (start <= endOfDay) {
            const end = new Date(start);
            end.setHours(start.getHours() + 1); // Add 1 hour
    
            intervals.push({
                start: new Date(start),
                end: new Date(end),
            });
    
            start.setHours(start.getHours() + 1); // Move to the next hour
        }
    
        return intervals;
    }

    function formatDateToYYYYMMDD(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
    
        return `${year}-${month}-${day}`;
    }

    function formatDateToHHMM(date: Date): string {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${hours}:${minutes}`;
    }

    function getInfoFromTime(timeRange: TimeRange) {
        const startTime = formatDateToHHMM(timeRange.start);
        const endTime = formatDateToHHMM(timeRange.end);

        const info = screenInfors.filter((info) => {
            const date = new Date(info.fromDate.slice(0, -6));
            return date.getTime() >= timeRange.start.getTime() && date.getTime() <= timeRange.end.getTime();
        });

        if (info.length === 0) {
            return (
                <div className="w-full h-full bg-gray-300 p-2">
                    <div className="flex items-center font-bold">
                        <div>{startTime}</div>
                        <div> - </div>
                        <div>{endTime}</div>
                    </div>
                </div>
            );
        }

        let mouseFrequency = Math.round(info[0].mouseCount / 1200 * 100);
        let keyFrequency = Math.round(info[0].keyCount / 1200 * 100);
        mouseFrequency = Math.min(100, Math.max(2, mouseFrequency));
        keyFrequency = Math.min(100, Math.max(2, keyFrequency));

        return (
            <div className="p-2">
                <div className="flex items-center font-bold">
                    <div>{startTime}</div>
                    <div> - </div>
                    <div>{endTime}</div>
                </div>
                <div className="flex w-full my-1">
                    <div className="flex w-1/2 items-center">
                        <img src="/mouse-icon.svg" className="w-4 h-4" />
                        <div className="w-full border-gray-600 h-3 border-[1px] ml-1 relative">
                            <div className={`h-[10px] bg-green-400`} style={{ width: `${mouseFrequency}%` }}></div>
                        </div>
                    </div>
                    <div className="flex w-1/2 items-center ml-1">
                        <img src="/keyboard-icon.svg" className="w-4 h-4" />
                        <div className="w-full border-gray-600 h-3 border-[1px] ml-1 relative">
                            <div className={`h-[10px] bg-green-400`} style={{ width: `${keyFrequency}%` }}></div>
                        </div>
                    </div>
                </div>
                <div>
                    Video Duration: {info[0].duration} s
                </div>
                <div className="text-sm mt-2">
                    {info[0].urls.map((app) => app && (
                        <div key={app} className="border mt-1 border-gray-600 px-1 break-words">
                            {app}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function viewVideo(dateRange: TimeRange) {
        const info = screenInfors.filter((info) => {
            const date = new Date(info.fromDate.slice(0, -6));
            return date.getTime() >= dateRange.start.getTime() && date.getTime() <= dateRange.end.getTime();
        });

        if (info.length === 0) return;

        setVideoUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${info[0].fileLocation}`);
        setModalShow(true);
    }

    useEffect(() => {
        if (selectedDate) {
            const date = new Date(selectedDate);
            setMinIntervals(getTenMinuteIntervals(date));
            setHourIntervals(getAnHourInterval(date));
        }
    }, [selectedDate]);

    return (
        <div className="text-[#222e44]">
            <div className="text-2xl font-bold my-5">
                {formatDateToYYYYMMDD(new Date(selectedDate || ''))}
            </div>
            <div className="flex w-full">
                <div className="grid grid-cols-6 gap-3 flex-grow ml-4">
                    {minIntervals.map((interval, index) => (
                        <div key={index} className="border border-gray-300 rounded-md min-h-32 cursor-pointer" onClick={() => viewVideo(interval)}>
                            {getInfoFromTime(interval)}
                        </div>
                    ))}
                </div>
            </div>        
            {modalShow && (
                <Modal open={modalShow} onClose={() => setModalShow(false)} className="w-[1600px]">
                    <video className="w-[1600px]" src={videoUrl} controls autoPlay></video>
                </Modal>
            )}    
        </div>
    );
}