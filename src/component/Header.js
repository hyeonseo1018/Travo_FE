import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { PiSignInBold } from 'react-icons/pi';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import authAxios from './AuthAxios';

const Header = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('2박 3일 서울 여행 계획획');
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const plans = [
    {
      id: 1,
      plan: '2박3일 서울 여행 계획',
    },
    {
      id: 1,
      plan: '2박3일 서울 여행 계획',
    },
    {
      id: 1,
      plan: '2박3일 서울 여행 계획',
    },
  ];
  useEffect(() => {
    authAxios
      .get('/auth/check')
      .then((res) => {
        if (res.status == 200) {
          setAuth(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: mobile ? 'transparent' : 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...(!mobile && { borderBottom: '1px solid #EFEFEF' }),
      }}
    >
      <img src="/logo.svg" width={30} style={{ margin: '10px' }} />
      {!mobile && (
        <div style={{ padding: '10px', fontSize: '20px' }}>Travo</div>
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          fontSize: '20px',
        }}
      >
        {mobile ? (
          <p style={{ fontWeight: 700 }}>Travo</p>
        ) : (
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              border: 'none',
              height: '50px',
              width: '40%',
              fontSize: '80%',
              textAlign: 'center',
              outline: 'none',
            }}
          ></input>
        )}
      </div>
      {auth ? (
        <button
          style={{ background: 'none', border: 'none', margin: '10px' }}
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={30} />
        </button>
      ) : (
        <button
          style={{ background: 'none', border: 'none', margin: '10px' }}
          onClick={() => navigate('/login')}
        >
          <PiSignInBold size={30} />
        </button>
      )}

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} mobile={mobile}>
        {plans.map((plan) => (
          <div key={plan.id} className="search-item">
            {plan.plan}
          </div>
        ))}
      </Sidebar>
    </div>
  );
};

export default Header;
