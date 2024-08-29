'use client';
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallLogs } from '@/app/apis/getCallLogs'
import Modal from './Modal';

// Define the type for a row of data
interface CallLog {
  id: string;
  userName: string;
  fromTime: string;
  duration: string;
  client: string;
  company: string;
  nationality: string;
  gender: boolean;
  video: boolean;
  // caption: string;
  fileLocation: string;
}





function CallLogTable() {
  const {callLogs, error} = useCallLogs()

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<CallLog[]>([]);
  const [callLogsData, setCallLogsData] = useState<CallLog[]>([]);

  const [modalShow, setModalShow] = useState(false);
  const [fileUrl, setFileUrl] = useState('')
  const [mediaType, setMediaType] = useState('')
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!modalShow) {
      // Stop the media when the modal is closed
      if (mediaType === 'mp3' && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [modalShow, mediaType]);
  
  // Define the columns with proper typing
  const columns: TableColumn<CallLog>[] = [
    {
      name: 'NO',
      cell: (row: CallLog, index: number) => index + 1,
      width: '3%',
    },
    {
      name: 'USERNAME',
      selector: (row: CallLog) => row.userName,
      sortable: true,
      width: '8%',
    },
    {
      name: 'FROM',
      selector: (row: CallLog) => row.fromTime,
      sortable: true,
      width: '13%',
    },
    {
      name: 'Duration',
      selector: (row: CallLog) => row.duration,
      sortable: true,
      width: '13%',
    },
    {
      name: 'CLIENT NAME',
      selector: (row: CallLog) => row.client, 
      sortable: true,
      width: '10%',
    },
    {
      name: 'CLIENT COMPANY',
      selector: (row: CallLog) => row.company,
      sortable: true,
      width: '10%',
    },
    {
      name: 'CLIENT COUNTRY',
      selector: (row: CallLog) => row.nationality,
      sortable: true,
      width: '10%',
    },
    {
      name: 'GENDER',
      selector: (row: CallLog) => (row.gender ? "Male" : "Female"),
      sortable: true,
      width: '6%',
    },
    {
      name: 'TYPE',
      cell: (row: CallLog) => (row.video ? <img className='w-10 block mx-auto' src='/video.png'/> : <img className='w-6 block mx-auto' src='/voice.png'/>),
      sortable: true,
      width: '6%',
    },
    {
      name: 'LOCATION',
      selector: (row: CallLog) => row.fileLocation,
      sortable: true,
      width: '16%',
    },
    // {
    //   name: 'Caption',
    //   cell: (row: CallLog) => (
    //     <div className="relative group">
    //       {row.caption?.substring(0, 10) + '...'}
    //     </div>
    //   ),
    //   sortable: true,
    //   width: '7%',
    // },
    {
      name: 'VIEW',
      cell: (row: CallLog) => (
        <div className="relative group">
          <button 
            onClick={() => viewMedia(row.id, row.fileLocation)} 
            className="bg-[#222e44] text-white p-2 rounded hover:bg-[#222e44] focus:outline-none focus:ring-2 focus:ring-[#222e44] transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
        </div>
      ),
      width: '5%',
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  function viewMedia(id: string, fileLocation: string) {
    // window.open('view-media/?id=' + id, '_blank');
    // window.open(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + fileLocation);
    let array = fileLocation.split('.');
    let extension = array[array.length - 1];
    setMediaType(extension)
    setFileUrl(fileLocation)
    setModalShow(true)
  }

  useEffect(() => {
    const filterData = callLogsData.filter(item => {
      return (
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fromTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.gender ? 'Male' : 'Female').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.video ? 'Video' : 'Voice').toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fileLocation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredData(filterData);
  }, [searchTerm]);

  useEffect(() => {
    setCallLogsData(callLogs);
    setFilteredData(callLogs)
  }, [callLogs])
  if (!mounted || !callLogs) {
    return null; // Or a loading indicator
  }

  return (
    <div className='w-full'>
      <DataTable
        className='border'
        columns={columns}
        data={filteredData}
        pagination
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        }
        customStyles={{
          headCells: {
            style: {
              backgroundColor: '#222e44', // Tailwind color or any hex color
              color: '#FFFFFF', // Header text color
              fontSize: '12px',
              fontWeight: 'bold',
            },
          },
          rows: {
            style: {
              fontSize: '12px',
            },
          },
        }}
      />
      <Modal open={modalShow} onClose={() => setModalShow(false)} className={mediaType == 'mp3' ? 'w-auto' : 'w-[1600px]'}>
        <div>
          {
            mediaType == 'mp3' ? 
            <audio ref={audioRef} src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + fileUrl} controls autoPlay></audio>
            :
            <video ref={videoRef} className='w-[1600px]' src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + fileUrl}  controls autoPlay></video>
          }
        </div>
      </Modal>
    </div>
  );
}

export default CallLogTable;
