import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AuthContext from '../Context/Auth/AuthContext';
import { useAppDispatch, useAppSelector } from '../Redux/Store/Store';
import { refresh } from '../Redux/slices/signup_login.';


const PersistentLogin = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const { persist } = useContext(AuthContext);
    const {
        pat_accessToken,
        doc_accessToken,
        role,
    } = useAppSelector((state) => state?.states);
    const accessToken = role === "patient" ? pat_accessToken : doc_accessToken;

    useEffect(() => {
        const verifyToken = async () => {
            if (!accessToken && persist) {

                try {
                  
                    await dispatch(refresh());

                } catch (error) {
                    console.error("Token refresh failed", error);
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, [accessToken, persist]);

    return (
        <>
            {!persist ? <Outlet /> :
                loading ? <p>Loading...</p> : <Outlet />}
        </>
    );
};

export default PersistentLogin;
