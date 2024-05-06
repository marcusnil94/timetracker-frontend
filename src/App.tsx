
import { useEffect, useState } from 'react';
import './App.css'
import Menu from './components/Menu';
import Start from './components/Start';
import Login from './components/Login';
import Checkin from './components/Checkin';
import Register from './components/Register';


function App() {
  const [page, setPage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status

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
      setIsLoggedIn(false); // Set isLoggedIn to false when user logs out
      localStorage.removeItem('userId'); // Remove userId from localStorage
      setPage("start"); // Redirect user to Start page after logout
  };

  return (
      <>
          <h1>Timetracker</h1>
          <Menu setPage={setPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

          {
              {
                  "register": <Register />,
                  "login": <Login setIsLoggedIn={setIsLoggedIn} setPage={setPage}/>,
                  "checkin": <Checkin />
              }[page] || <Start />
          }
      </>
  )
}

export default App;
