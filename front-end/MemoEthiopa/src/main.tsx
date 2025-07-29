import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import Error404 from './components/Error_404.tsx';
import store from './store/store.ts';
import SignIn from './Pages/login/SignIn.tsx';
import OTP from './Pages/OTP/OTP.tsx';
import HomeLayout from './Pages/home/homelayout.tsx';
import SignUp from './Pages/signup/SignUp.tsx';
import Devpag from './Pages/DeveloperO/Devpag.tsx';
import NotePage from './Pages/home/NotePage.tsx';
import Upgrade from './Pages/payment/Upgrade.tsx';
import Blog from './Pages/Blog/Blog.tsx';
import BlogPostDetail from './Pages/Blog/BlogPostDetail.tsx';
import BlogContactus from './Pages/Blog/BlogContactus.tsx';
import BlogAboutUs from './Pages/Blog/BlogAboutUs.tsx';
import BlogPost from './Pages/Blog/BlogAdd.tsx';
import BlogDelete from './Pages/Blog/BlogDelete.tsx';
import BlogpostEdit from './Pages/Blog/BlogpostEdit.tsx';
import BlogCategoriesFilter from './Pages/Blog/BlogCategories.tsx';
import BlogAdminDashboard from './Pages/Blog/BlogPostDashbored.tsx';
import Setting from './Pages/home/Setting.tsx';
import SettingPort from './Pages/home/SettingPort.tsx';
import AboutUs from './Pages/Landing/AboutUS.tsx';
import PricingPage from './Pages/Landing/Pricing.tsx';
import ContectUS from './Pages/Landing/ContectUS.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route index element={<FirstContent />} /> */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/pricing' element={<PricingPage />} />
          <Route path='/contectus' element={<ContectUS />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otp_verification' element={<OTP />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/feed' element={<HomeLayout />} />
          <Route path='/setting' element={<Setting />} >
            <Route path=":settingport" element={<SettingPort />} />
          </Route>
          <Route path='/feed/:foldername' element={<HomeLayout />} >
            <Route path=":noteId" element={<NotePage />} />
          </Route>
          <Route path='/blog' element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/blog/contactus" element={<BlogContactus />} />
          <Route path="/blog/aboutus" element={<BlogAboutUs />} />
          <Route path="/blog/newpost" element={<BlogPost />} />
          <Route path="/blog/dashboard" element={<BlogAdminDashboard />} />
          <Route path="/blog/category/:title" element={<BlogCategoriesFilter />} />
          <Route path="/blog/delete/:slug" element={<BlogDelete />} />
          <Route path="/blog/edit/:slug" element={<BlogpostEdit />} />

          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/developerOptions" element={<Devpag />} />
          <Route path="/developerOptions/backend" element={<>Hi Back end</>} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
