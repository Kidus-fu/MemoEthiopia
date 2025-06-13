import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import Error404 from './components/Error_404.tsx';
import store from './store/store.ts';
import SignIn from './Pages/login/SingIn.tsx';
import OTP from './Pages/OTP/OTP.tsx';
import Home from './Pages/home/home.tsx';
import SignUp from './Pages/signup/SignUp.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route index element={<FirstContent />} /> */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otp_verification' element={<OTP />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/feed' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
