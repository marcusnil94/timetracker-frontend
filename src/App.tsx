
import { useEffect, useState } from 'react';
import './App.css'
import Menu from './components/Menu';
import Start from './components/Start';
import Login from './components/Login';
import Checkin from './components/Checkin';
import Register from './components/Register';
import UserCheckins from './components/UserCheckins';


function App() {
  const [page, setPage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
      let pageUrl = page;

      if (!pageUrl) {
          const queryParameters = new URLSearchParams(window.location.search);
          const getUrl = queryParameters.get("page");

          if (getUrl) {
              pageUrl = getUrl;
              setPage(getUrl)
          } else {
              pageUrl = "start"
          }
      }

      window.history.pushState(
          null,
          "",
          "?page=" + pageUrl
      )

  }, [page])

  const handleLogout = () => {
      setIsLoggedIn(false); 
      localStorage.removeItem('userId'); 
      setPage("start"); 
  };

  return (
      <>
          <h1>Timetracker</h1>
          <Menu setPage={setPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

          {
              {
                  "register": <Register />,
                  "login": <Login setIsLoggedIn={setIsLoggedIn} setPage={setPage}/>,
                  "checkin": <Checkin />,
                  "usercheckins": <UserCheckins />
              }[page] || <Start />
          }
      </>
  )
}

export default App;
