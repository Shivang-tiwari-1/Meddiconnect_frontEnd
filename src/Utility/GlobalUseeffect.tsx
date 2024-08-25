import { useEffect } from "react";
import { useAppDispatch } from "../Redux/Store/Store";


const globalUseEffect = function (actionFunction) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(actionFunction());
    }, [dispatch, actionFunction]);
};

export default globalUseEffect;