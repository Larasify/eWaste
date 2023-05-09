import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import React, {useContext} from 'react'
import IconButton from '@mui/material/IconButton';
import {RiLogoutBoxLine} from 'react-icons/ri';
import Tooltip from '@mui/material/Tooltip';

import {AuthContext} from "../App";
import DataTable from '../fragments/Dashboard-components/DataTable';

export default function AdminDashboard() {
    const authState = useContext(AuthContext)
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = React.useState({cols: [], rows: []})
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        if(!authState.isLoggedIn || authState.privilege!='admin') navigate('/')
        fetchData();
    }, [loading])

    const fetchData = () => {
        fetch('/user/getuserlist')
        .then(userRequest => (userRequest).json())
        .then(users => {
            const userList = (users.user_list).filter(u => !u.is_deleted);
            userList.map( u => u.id = u._id)
            setUserData({
                cols: [
                    {field: 'first_name', headerName: 'First Name', flex: 2},
                    {field: 'last_name', headerName: 'Last Name', flex: 2},
                    {field: 'email', headerName: 'Email', flex: 2},
                    {field: 'phone_no', headerName: 'Phone Number', flex: 2},
                    {field: 'privilege', headerName: 'Privilege', flex: 1},
                ],
                rows: userList
            });
            setLoading(false);
        });
    }

    const renderTable = () => {if (loading) {
        return <div className='w-full h-full justify-center items-center flex flex-col mt-8'>
            <CircularProgress sx={{
                color: '#bb92d7'
            }} />
            <label className='mt-4 lg:mt-8 text-grey'>Fetching Details. Please wait</label>
        </div>
    } else {
        return <DataTable 
            rows={userData.rows}
            cols={userData.cols}
            fns={[`Add User`, `Delete User`, `Edit User`, `Freeze User Record`]}
            title='User'
            count={userData.rows.length}
            redirect_urls={{
                modify: '/admin/edit-user-form',
                delete: '/user/deleteuser'
            }}
            logout={true}
        /> 
    }
    }

    return (
        <div className="flex w-full h-full flex-row">
            {renderTable()}
        </div>
    )
}
