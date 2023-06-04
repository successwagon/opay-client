import React, { useRef } from 'react';
import Credentials from './Credentials';
import useAuth from "../../hooks/useAuth"

const Home = () => {
    const { setAuth } = useAuth();
    const deleteAllRef = useRef(null);
    const clearAuth = () =>{
        sessionStorage.removeItem('authToken');
        setAuth({});
    }

    const deleteAll = () => {
        if(deleteAllRef.current){
            deleteAllRef.current.DeleteCredentials();
        }
      };
   
    return (
        <div className="container">
            <div>
                <span className='page-header'>User Dashboard</span>
                <hr/>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="btn-add-user">
                    <a href='#!' onClick={deleteAll}>Delete All</a>
                </div>
                <div className="btn-add-user">
                    <a href='#!' onClick={clearAuth}>Logout</a>
                </div>
            </div>
            <hr/>
            <Credentials ref={deleteAllRef} />
        </div>
    )
}

export default Home
