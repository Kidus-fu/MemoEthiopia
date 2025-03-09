import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import SignIn from './components/Sing_in.tsx';
import { Provider } from "react-redux";
import Error404 from './components/Error_404.tsx';
import store from './store/store.ts';
import OTP from './components/OTP.tsx';
import SingUp from './components/Sing_up.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route index element={<FirstContent />} /> */}
        <Route path='/singin' element={<SignIn />} />
        <Route path='/singup' element={<SingUp />} />
        <Route path='/otp' element={<OTP />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
