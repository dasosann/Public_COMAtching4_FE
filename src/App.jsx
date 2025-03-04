// import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage.jsx";
import Matchresult from "./pages/Matchresult.jsx";
import Checkresult from "./pages/Checkresult.jsx";
import Loading from "./pages/Loading.jsx";
import Guide from "./pages/Guide.jsx";
import Redirection from "./pages/RedirectionPage.jsx";
import OpenExternalBrowser from "./OpenExternalBrowser.jsx";
import Userinfo from "./pages/User_info_page.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Describe from "./pages/Describe.jsx";
import "./App.css";
import "./axiosConfig.jsx";
import Matching from "./pages/Matching.jsx";
import Adminpageunlogin from "./pages/Adminpage_unlogin.jsx";
import Heart from "./pages/Heart.jsx";
import AdminRequestList from "./components/AdminRequestList.jsx";
import Charge from "./pages/Charge.jsx";
import EventModal from "./components/EventModal.jsx";
import ProfileBuilder from "./pages/ProfileBuilder.jsx";
import Hobby from "./pages/Hobby.jsx";
import Mypage from "./pages/Mypage.jsx";
import MainPaymentModal from "./components/MainPaymentModal.jsx";

import ProfileEdit  from "./pages/ProfileEdit.jsx"

import SuccessPage from "./components/PaymentSuccess.jsx";
import PaymentCallTest from "./components/PaymentCallTest.jsx";
import Adminpage_MyPage from "./pages/Adminpage_MyPage.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminWebmail from "./pages/AdminWebmail.jsx";
import AdminSearch from "./components/Admin/AdminSearch.jsx";


export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/match-result" element={<Matchresult />} />
            <Route path="/check-result" element={<Checkresult />} />
            
            <Route path="/hobby" element={<Hobby />} />
            <Route path="/adminpage" element={<Adminpageunlogin />} />
            <Route
              path="/adminpage/charge-requests"
              element={<AdminRequestList />}
            />
            <Route
              path="/adminpage/myPage"
              element={<Adminpage_MyPage />}
            />
            <Route
              path="/adminpage/myPage/search"
              element={<AdminSearch />}
            />
            <Route
              path="/adminpage/register"
              element={<AdminRegister />}
            />
            <Route
              path="/adminpage/webmail-check"
              element={<AdminWebmail/>}
            />
            

            <Route path="/loading" element={<Loading />} />
            
            <Route path="/profile-builder" element={<ProfileBuilder />} />
            <Route path="/redirection" element={<Redirection />} />
            <Route path="/userinfo" element={<Userinfo />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/describe" element={<Describe />} />
            <Route path="/charge" element={<Charge />} />
            <Route path="/heart" element={<Heart />} />
            <Route path="/event" element={<EventModal />} />

            <Route path="/test" element={<PaymentCallTest />} />

            {/* <Route path="/test" element={<MainPaymentModal />} /> */}

            <Route path="/mypage" element={<Mypage />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            

            <Route path="/success" element={<SuccessPage/>} />
            {/* <Route path="/test" element={<PaymentCallTest/>} /> */}
            


          </Routes>

        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
