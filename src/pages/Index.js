import React from 'react'

import { BrowserRouter } from 'react-router-dom';
import Routes from '../components/route/Routes';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from '../components/login/Login';

export default function Index() {

    const[log, setLog] = useLocalStorage('log');



    return (
        <BrowserRouter>
          {log? <Routes /> : <Login setLog={setLog}/>}
          

        </BrowserRouter>
    )
}
