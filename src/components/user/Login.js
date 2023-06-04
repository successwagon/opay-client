import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from '../../api/axios';
import Spinner from "../utilities/Spinner";

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('login',
                JSON.stringify({ email: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const authToken = response?.data?.data?.token;
            sessionStorage.setItem('authToken', authToken);
            const decodedToken = jwt_decode(authToken);
            setAuth({ user: email, username: Object.values(decodedToken)[1], role: Object.values(decodedToken)[4], authToken: authToken });
            setEmail('');
            setPassword('');
            setLoading(false);
            navigate('/userdashboard', { replace: true });
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
                        type="email"
                        id="email"
                        placeholder='Email address'
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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

export default Login
