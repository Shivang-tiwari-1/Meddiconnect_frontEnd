import React from 'react'
import { motion } from 'framer-motion'
import { useAppSelector } from '../../Redux/Store/Store'



const AnimatedMenuComponent = () => {
      const {  menu } = useAppSelector((state) => state.stateChange)
    
    return (
        <>

        </>
    )
}

export default AnimatedMenuComponent
