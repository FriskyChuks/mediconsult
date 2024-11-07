import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useEffect, useState } from "react"
import api from "./AxiosInstance"

import NavBar from './components/layouts/NavBar'
import About from './components/pages/About'
import Services from './components/pages/Services'
import Footer from './components/layouts/Footer'
import Store from './components/pages/Store'
import Contacts from "./components/pages/Contacts"
import Home from './components/pages/Home'
import RegisterForm from './components/auth/RegisterForm'
import ActivationPage from "./components/auth/ActivationPage"
import ResendActivation from "./components/auth/ResendActivation"
import ResetPassword from "./components/auth/ResetPassword"
import LoginForm from './components/auth/LoginForm'
import Profile from './components/auth/Profile'
import OnlineUsers from "./components/auth/OnlineUsers"
import PlaceOrder from './components/orders/PlaceOrder'
import Orders from './components/orders/Orders'
import OrderDetails from "./components/orders/OrderDetails"
import OrdersList from "./components/orders/OrdersList"
import Apply from "./components/clinicians/Apply"
import BookConsultation from "./components/consultations/BookConsultation"
import MessagingComponent from "./components/consultations/MessagingComponent"
import RaisePrescription from "./components/prescriptions/RaisePrescription"
import ApplicationList from "./components/clinicians/ApplicationList"
import ApplicationDetail from "./components/clinicians/ApplicationDetail"

import { SearchProvider } from './components/contexts/SearchContext'
import SearchResults from "./components/contexts/SearchResults"
import { MessageProvider } from "./components/contexts/MessageContext"
import MessageModal from './components/layouts/MessageModal';


const App = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)


  const fetchUsers = async () => {
    try {
      const response = await api.get(`${baseURL}/accounts/get_all_users/`);
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <SearchProvider>
      <BrowserRouter>
      <MessageProvider>
        <NavBar baseURL={baseURL} usersList={users} />
        <MessageModal />
        <main>
          <Routes>
              <Route path="/search" element={<SearchResults baseURL={baseURL} />} />
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/services" element={<Services/>}/>
              <Route path="/store" element={<Store/>}/>
              <Route path="/contact" element={<Contacts/>}/>
              <Route path="/auth/users/activation/:uid/:token" element={<ActivationPage baseURL={baseURL} loading={loading} setLoading={setLoading} />}/>
              <Route path="/register" element={<RegisterForm baseURL={baseURL} loading={loading} setLoading={setLoading} />}/>
              <Route path="/login" element={<LoginForm baseURL={baseURL} loading={loading} setLoading={setLoading}/>}/>
              <Route path="/auth/resend_activation" element={<ResendActivation baseURL={baseURL} loading={loading} setLoading={setLoading} />}/>
              <Route path="/auth/reset_password" element={<ResetPassword baseURL={baseURL} />}/>
              <Route path="/auth/profile" element={<Profile baseURL={baseURL} />}/>
              <Route path="/auth/online_users" element={<OnlineUsers baseURL={baseURL} />}/>
              <Route path="/place_order" element={<PlaceOrder baseURL={baseURL} loading={loading} setLoading={setLoading} />}/>
              <Route path="/orders" element={<Orders baseURL={baseURL} />}/>
              <Route path="/order_detail/:id" element={<OrderDetails baseURL={baseURL} loading={loading} setLoading={setLoading} />} />
              <Route path="/orders_list" element={<OrdersList baseURL={baseURL} />} />
              <Route path="/book_consultation" element={<BookConsultation baseURL={baseURL} usersList={users} />} />
              <Route path="/message/:id" element={<MessagingComponent baseURL={baseURL} usersList={users} />} />
              <Route path="/prescribe/:id" element={<RaisePrescription baseURL={baseURL} usersList={users} />} />
              <Route path="/apply" element={<Apply baseURL={baseURL} loading={loading} setLoading={setLoading} />} />
              <Route path="/application_list" element={<ApplicationList baseURL={baseURL} />} />
              <Route path="/application_detail/:id" element={<ApplicationDetail baseURL={baseURL} loading={loading} setLoading={setLoading} />} />
          </Routes>
        </main>
        <Footer/>
        </MessageProvider>
      </BrowserRouter>
      </SearchProvider>
  )
}

export default App