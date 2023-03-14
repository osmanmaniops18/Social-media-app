import {Route, Routes} from "react-router-dom";
import Home from "./scenes/Homepage/Home.jsx"
import Login from "./scenes/loginPage/Login.jsx"
import Profile from "./scenes/profilePage/Profile.jsx"
import { useMemo } from "react";
import {useSelector} from "react-redux";
import {CssBaseline,ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {

  const mode=useSelector((state)=>state.mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="app">
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    
     <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route exact path="/profile/:userId" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>


     </Routes>
     </ThemeProvider>
    </div>
  );
}

export default App;
