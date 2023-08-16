import "./App.css";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// Components
import Feed from "./pages/Feed/Feed";
import Join from "./pages/Join/Join";
import Profile from "./pages/Profile/Profile";
import Notifications from "./pages/Notifications/Notifications";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import useAuthContext from "./hooks/useAuthContext";
import useAuthUser from "./hooks/useAuthUser";
import ExpandTweet from "./pages/ExpandTweet/ExpandTweet";
import ViewQuotes from "./pages/ViewQuotes/ViewQuotes";
import ExploreUsers from "./pages/ExploreUsers/ExploreUsers";
import DisplayError from "./components/DisplayError/DisplayError";
import NotFound from "./components/NotFound/NotFound";
import IntroductionPopup from "./components/IntroductionPopup/IntroductionPopup";
import { ThemeContext } from "./contexts/ThemeContext";
import useErrorContext from "./hooks/useErrorContext";


function App() {
  const {theme} = useContext(ThemeContext)
  const { user, dispatch } = useAuthContext();
  const {error} = useErrorContext()
  const [displayError, setDisplayError] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const { validateToken } = useAuthUser();
  
  // First check if the user token is valid
  useEffect(
    () => {
      let isSubscribed = true;
      const validate = async token => {
        const res = await validateToken(token);
        if (isSubscribed) {
          dispatch({type: 'LOGIN', payload: res.data.user})
        }
      };
      if (user) {
        validate(user.token);
      }
      setIsPending(false)
      return () => ( isSubscribed = false )
    },
    []
  );

  useEffect(() => {
    if (error) {
      setDisplayError(true)
    }
  }, [error])
  
  return (
    <div className="App" data-theme={theme}>
    <IntroductionPopup />
      <BrowserRouter>
        {!isPending &&
        <>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/feed" /> : <Join />} />

            <Route path="/feed" element={!user ? <Navigate to="/" /> : <Feed />} />
            <Route path="/feed/:type" element={!user ? <Navigate to="/" /> : <Feed />} />

            <Route path="/profile" element={!user ? <Navigate to="/" /> : <Profile />} />
            <Route path="/profile/:username" element={!user ? <Navigate to="/" /> : <Profile />} />
            <Route path="/profile/:username/:get" element={!user ? <Navigate to="/" /> : <Profile />} />

            <Route path="/notifications" element={!user ? <Navigate to="/" /> : <Notifications />} />
            <Route path="/notifications/:type" element={!user ? <Navigate to="/" /> : <Notifications />} />

            <Route path="/bookmarks" element={!user ? <Navigate to="/" /> : <Bookmarks />} />
            
            <Route path="/tweet/:id" element={!user ? <Navigate to="/" /> : <ExpandTweet />} />
            <Route path="/tweet" element={!user ? <Navigate to="/" /> : <Navigate to="/feed" />} />

            <Route path="/quotes/:id" element={!user ? <Navigate to="/" /> : <ViewQuotes />} />
            <Route path="/quotes" element={!user ? <Navigate to="/" /> : <Navigate to="/feed" />} />

            <Route path="/explore/users" element={!user ? <Navigate to="/" /> : <ExploreUsers />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
        }
        {displayError && <DisplayError error={error} setDisplayError={setDisplayError} />}
        {/* {isPending && (
          <div className="empty-page">
          <Logo />{error}</div>)} */}
      </BrowserRouter>
    </div>
  );
}

export default App;
