import Login from './components/user/Login';
import Layout from './components/Layout';
import Home from './components/user/Home';
import AddCredential from './components/credential/AddCredential';
import Missing from './components/utilities/Missing';
import RequireAuth from './components/utilities/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
       
        <Route path="user" element={<Login />} />

        <Route path="/" element={<AddCredential />} />

        <Route element={<RequireAuth allowedRoles={['User']} />}>
          <Route path="/userdashboard" element={<Home />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;