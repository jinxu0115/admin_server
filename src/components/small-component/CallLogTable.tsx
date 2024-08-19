'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useCallLogs } from '@/app/apis/getCallLogs'
import Modal from './Modal';

// Define the type for a row of data
interface CallLog {
  id: string;
  userName: string;
  fromTime: string;
  toTime: string;
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
  
  // Define the columns with proper typing
  const columns: TableColumn<CallLog>[] = [
    {
      name: 'No',
      cell: (row: CallLog, index: number) => index + 1,
      width: '3%',
    },
    {
      name: 'UserName',
      selector: (row: CallLog) => row.userName,
      sortable: true,
      width: '8%',
    },
    {
      name: 'From',
      selector: (row: CallLog) => row.fromTime,
      sortable: true,
      width: '13%',
    },
    {
      name: 'To',
      selector: (row: CallLog) => row.toTime,
      sortable: true,
      width: '13%',
    },
    {
      name: 'Client Name',
      selector: (row: CallLog) => row.client,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Client Company',
      selector: (row: CallLog) => row.company,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Client Country',
      selector: (row: CallLog) => row.nationality,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Gender',
      selector: (row: CallLog) => (row.gender ? "Male" : "Female"),
      sortable: true,
      width: '6%',
    },
    {
      name: 'Type',
      selector: (row: CallLog) => (row.video ? 'Video' : 'Voice'),
      sortable: true,
      width: '6%',
    },
    {
      name: 'Url',
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
      name: 'View',
      cell: (row: CallLog) => (
        <div className="relative group">
          <button 
            onClick={() => viewMedia(row.id, row.fileLocation)} 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        item.toTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              backgroundColor: '#4A90E2', // Tailwind color or any hex color
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
      <Modal open={modalShow} onClose={() => setModalShow(false)} className='w-[1600px]'>
        <div>
          {
            mediaType == 'mp3' ? 
            <audio src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + fileUrl} controls autoPlay></audio>
            :
            <video className='w-[1600px]' src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + fileUrl}  controls autoPlay></video>
          }
        </div>
      </Modal>
    </div>
  );
}

export default CallLogTable;
