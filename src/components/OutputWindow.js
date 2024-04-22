import React, { useEffect, useState } from 'react';
import { initSocket } from '../socket';
const OutputWindow = ({ output,socket,setOutput,outputr }) => {
    const [outputlocal,setop]=useState();
    const[count,setCount]=useState(0);
    useEffect(() => {
        try{
        socket.current.emit('outputChange', { output });

        }
        catch(e)
        {
            console.log(e)
        }
    }, [output, socket]);
    useEffect(()=>{
        const init=async()=>{
        const socketI = await initSocket();
        socketI.on("op",({Output})=>{
            setOutput(Output)
            console.log(Output)
                
        })
    }
    },[])
    return (

       <></>
    );
}

export default OutputWindow;
