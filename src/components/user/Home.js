import React, { useRef, useState } from 'react';
import Credentials from './Credentials';
import useAuth from "../../hooks/useAuth"

const Home = () => {
    const { setAuth } = useAuth();
    const deleteAllRef = useRef(null);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const clearAuth = () =>{
        sessionStorage.removeItem('authToken');
        setAuth({});
    }

    const deleteAll = () => {
        if(deleteAllRef.current){
            deleteAllRef.current.DeleteCredentials();
        }
      };

      const handleItemsChange = (items) => {
        setIsDeleteDisabled(items?.length === 0);
      };
   
    return (
        <div className="container">
            <div>
                <span className='page-header'>User Dashboard</span>
                <hr/>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="dashboard-btn">
                    <button onClick={deleteAll} disabled={isDeleteDisabled}>Delete All</button>
                </div>
                <div className="dashboard-btn">
                    <a href='#!' onClick={clearAuth}>Logout</a>
                </div>
            </div>
            <hr/>
            <Credentials onItemsChange={handleItemsChange} ref={deleteAllRef} />
        </div>
    )
}

export default Home
