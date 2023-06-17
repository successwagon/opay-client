import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Spinner from '../utilities/Spinner';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [alert, showAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  let credId = sessionStorage.getItem('credId');
  useEffect(()=>{
    if(!credId){
      navigate('/');
    }
  })
  useEffect(() => {
    if (countdown !== 0){
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [countdown]);

  useEffect(()=>{
    setDisabled(otp.length !== 6 );
  }, [otp]);

  const handleChange = (e, index) => {
    const { value, maxLength } = e.target;
    if (value.length <= maxLength) {
      const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
      setOtp(newOtp);
      console.log('a',otp)
      if (value.length === maxLength && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      await axios.patch(`credential/${credId}?otp=${otp}`,);
      setTimeout(() => {
        setLoading(false);
        showAlert(true);
    }, 1000);
    }catch{
      setLoading(false);
      showAlert(true);
    }
  }

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', marginTop: '20vh' }}>
      <div>
        <p style={{ textAlign: 'center', 'fontWeight': 600, fontSize: 'x-large'}}>Please enter code</p>
        <p style={{textAlign: 'center', fontSize: 'large' }}>A verification code has been sent to your phone number</p>
      </div>
      <form onSubmit={handleSubmit}>
        {alert &&  <div className="alert alert-danger" role="alert">
          Invalid otp. Please try again!
        </div>}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              style={{ width: '2rem', height: '2rem', margin: '3px 2px', backgroundColor: 'whitesmoke', border: 'none', borderRadius: '4px', textAlign: 'center' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 'medium', justifyContent: 'center' }}>
          <p>Didn't recieve code?&nbsp;&nbsp;</p>
          <p style={{ color: countdown === 0 ? '#1dcf9f' : 'gray' }} onClick={()=>setCountdown(60)} >
            Resend {countdown}s
          </p>
        </div>
        <button data-v-093779e2="" className={disabled ? "btn btn-disabled" : "btn btn-active"} disabled={disabled}>
            Verify
        </button>
      </form>
      {loading && <Spinner loading={loading}/> }
    </div>
  );
}

export default OtpPage