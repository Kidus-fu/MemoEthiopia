import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import Error404 from './components/Error_404.tsx';
import store from './store/store.ts';
import SignIn from './Pages/login/SingIn.tsx';
import SingUp from './Pages/singup/SingUp.tsx';
import OTP from './Pages/OTP/OTP.tsx';
import Home from './Pages/home/home.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route index element={<FirstContent />} /> */}
          <Route path='/singin' element={<SignIn />} />
          <Route path='/singup' element={<SingUp />} />
          <Route path='/otp_verification' element={<OTP />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/feed' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
