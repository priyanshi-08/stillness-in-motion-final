import React, { useState } from 'react'
import useUser from '../../hooks/useUser';
import DashboardNavigate from '../../routes/DashboardNavigate';

const Dashboard = () => {
    const {currentUser, isLoading} = useUser();
    const role = currentUser?.role;

    if (isLoading) {
        return (<div></div>)

    }
    return <DashboardNavigate/>
}

export default Dashboard