import { toogleMobileCheck } from "../Redux/slices/signup_login.";
import { useAppDispatch } from "../Redux/Store/Store";
import { useEffect } from "react";


export const globalResizeFunction = function () {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 540) {
                dispatch(toogleMobileCheck('375px'))
            } else {
                dispatch(toogleMobileCheck(null));
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch])

};
