import { useEffect, useState } from "react";
import ScreenViewer from "@/components/small-component/ScreenViewer";
import { SelectPicker } from 'rsuite';
import 'rsuite/SelectPicker/styles/index.css';
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import axios from "../../app/apis/axios";

export default function ScreenViewComponent() {
    const [users, setUsers] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios
            .get('/api/setting/list')
            .then(res => {
                const userOptions = res.data.reverse().map((pair : any) => ({
                    label: pair.userName,
                    value: pair.userName // Ensure this is the correct value
                }));

                setUsers(userOptions);

                // Automatically select the first user if there are users available
                if (userOptions.length > 0) {
                    setSelectedUser(userOptions[0].value); // Set the first user's value correctly
                }
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-start mt-5 mr-5">
                <SelectPicker 
                    label="User" 
                    value={selectedUser} 
                    data={users} 
                    onChange={(id) => setSelectedUser(id)} 
                    cleanable={false}
                    oneTap={true} 
                />
                <DatePicker 
                    className="ml-3"
                    placeholder="Select Date"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date || new Date())}
                    cleanable={false}
                />
            </div>
            <div className="py-5">
                <ScreenViewer selectedDate={selectedDate.toString()} selectedUser={selectedUser} />
            </div>
        </div>
    );
}