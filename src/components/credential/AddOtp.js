import { useState, useEffect } from 'react';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown === 0) {
      // enable the resend link
    } else {
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [countdown]);

  function handleSubmit(e) {
    e.preventDefault();
    // submit the OTP value
  }

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <p style={{ textAlign: 'center', 'font-weight': 500, fontSize: 'x-large'}}>Please enter code</p>
        <p style={{textAlign: 'center', fontSize: 'large' }}>A verification code has been sent to your phone number</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              style={{ width: '2rem', height: '2rem', margin: '0 2px', backgroundColor: 'whitesmoke', border: 'none', borderRadius: '4px', textAlign: 'center' }}
              value={otp[index] || ''}
              onChange={e => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 1) {
                  const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
                  setOtp(newOtp);
                }
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 'medium', justifyContent: 'center' }}>
          <p>Didn't recieve code?&nbsp;&nbsp;</p>
          <p style={{ color: countdown === 0 ? 'blue' : 'gray' }} onClick={()=>setCountdown(60)} >
            Resend {countdown}s
          </p>
        </div>
        <button data-v-093779e2="" className={otp.length === 6 ? "btn btn-active" : "btn btn-disabled"}>
            Verify
        </button>
      </form>
    </div>
  );
}

export default OtpPage