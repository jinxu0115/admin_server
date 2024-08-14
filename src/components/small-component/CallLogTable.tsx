'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getCallLogs } from '@/app/apis/getCallLogs'

// Define the type for a row of data
interface CallLog {
  id: string;
  userName: string;
  fromTime: string;
  toTime: string;
  client: string;
  company: string;
  nation: string;
  gender: boolean;
  isVideo: boolean;
  caption: string;
  fileLocation: string;
}

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
    width: '7%',
  },
  {
    name: 'From',
    selector: (row: CallLog) => row.fromTime,
    sortable: true,
    width: '12%',
  },
  {
    name: 'To',
    selector: (row: CallLog) => row.toTime,
    sortable: true,
    width: '12%',
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
    selector: (row: CallLog) => row.nation,
    sortable: true,
    width: '10%',
  },
  {
    name: 'Gender',
    selector: (row: CallLog) => (row.gender ? "Male" : "Female"),
    sortable: true,
    width: '5%',
  },
  {
    name: 'Type',
    selector: (row: CallLog) => (row.isVideo ? 'Video' : 'Voice'),
    sortable: true,
    width: '5%',
  },
  {
    name: 'Url',
    selector: (row: CallLog) => row.fileLocation,
    sortable: true,
    width: '15%',
  },
  {
    name: 'Caption',
    cell: (row: CallLog) => (
      <div className="relative group">
        {row.caption.substring(0, 10) + '...'}
      </div>
    ),
    sortable: true,
    width: '7%',
  },
  {
    name: 'View',
    cell: (row: CallLog) => (
      <div className="relative group">
        <button 
          onClick={() => viewMedia(row.id)} 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>
    ),
    width: '4%',
  },
];

function viewMedia(id: string) {
  window.open('view-media/?id=' + id, '_blank');
}

function CallLogTable() {
  const callLogs = getCallLogs()

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<CallLog[]>([]);
  const [callLogsData, setCallLogsData] = useState<CallLog[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const filterData = callLogsData.filter(item => {
      return (
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fromTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.toTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.gender ? 'Male' : 'Female').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.isVideo ? 'Video' : 'Voice').toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fileLocation.toLowerCase().includes(searchTerm.toLowerCase())
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
    </div>
  );
}

export default CallLogTable;
