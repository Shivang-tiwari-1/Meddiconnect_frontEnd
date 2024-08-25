import React from 'react';
import { useAppSelector } from '../../Redux/Store/Store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequiredAuthPatinet = ({ allowedRoles }) => {
    const { accessToken, role } = useAppSelector((state) => state.states);
    const location = useLocation(); 

    console.log("->", role);

    return (
        accessToken
            ? allowedRoles.includes(role)
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location.pathname }} replace />
            : <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
}

export default RequiredAuthPatinet;
