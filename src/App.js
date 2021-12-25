import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import "../src/scss/_app.scss";
import Login from "./pages/Login/Login";
import {
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Search from "./pages/Search/Search";
import Watch from "./pages/Watch/Watch";
import Subscriptions from "./pages/Subscription/Subscriptions";
import Channel from "./pages/Channel/Channel";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  );
};

function App() {
  const {accessToken, loading} = useSelector(state => state.auth)
  const history = useNavigate()

  useEffect(() => {
    if (!loading && !accessToken) {
      history('/auth')
    }
  },[accessToken, loading, history])

  return (
    <Routes>
      <Route path="/" exact element={
        <Layout>
          <Home />
        </Layout> }
      />

      <Route path='/auth' element={<Login />} />

      <Route path='/search/:query' element={
        <Layout>
            <Search />
        </Layout>}
      />

      <Route path='/watch/:id' element={
        <Layout>
            <Watch />
        </Layout>}
      />

      <Route path='/feed/subscriptions' element={
        <Layout>
            <Subscriptions />
        </Layout>}
      />
      
      <Route path='/channel/:channelId' element={
        <Layout>
            <Channel />
        </Layout>}
      />

      <Route element={ <Navigate to='/' />} />
        
    </Routes>
  );
}

export default App;
