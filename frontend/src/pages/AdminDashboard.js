/**
 * Admin Dashboard
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */

/* Module Imports
React library Components */
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import React, {useContext} from 'react'
import IconButton from '@mui/material/IconButton';
import {RiLogoutBoxLine} from 'react-icons/ri';
import Tooltip from '@mui/material/Tooltip';

/* Local Imports */
import {AuthContext} from "../App";
import DataTable from '../fragments/Dashboard-components/DataTable';

/* Main renderer */
export default function AdminDashboard() {
    /* AuthContext and navigator */
    const authState = useContext(AuthContext)
    const navigate = useNavigate();

    /* Local values for user list data*/
    const [userData, setUserData] = React.useState({cols: [], rows: []})
    /* Loader until user list is fetched */
    const [loading, setLoading] = React.useState(true)

    /* On page load, kick user if not admin or null */
    React.useEffect(() => {
        if(!authState.isLoggedIn || authState.privilege!='admin') navigate('/')
        fetchData();
    }, [loading])

    /* Fetch method to retrieve user data */
    const fetchData = () => {
        fetch('/user/getuserlist')
        .then(userRequest => (userRequest).json())
        .then(users => {
            /* Userlist and DataTable Column and Row declarations */
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

    /* Render Loading until data is available */
    const renderTable = () => {
        if (loading) {
        /* Loader */
            return <div className='w-full h-full justify-center items-center flex flex-col mt-8'>
                <CircularProgress sx={{
                    color: '#bb92d7'
                }} />
                <label className='mt-4 lg:mt-8 text-grey'>Fetching Details. Please wait</label>
            </div>
        } else {
            /* DataTable suitable for Manipulating users */
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

    /* Main Render method */
    return (
        <div className="flex w-full h-full flex-row">
            {renderTable()}
        </div>
    )
}
