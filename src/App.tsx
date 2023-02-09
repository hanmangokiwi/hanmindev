import React from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import Header from './components/Header';

import Home from './pages/Home';
import Mirrorboard from "./pages/projects/Mirrorboard";
import Projects from "./pages/projects/Projects";
import { ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import ScrollToTop from "./helpers/ScrollToTop";


const MuiTheme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: "#dadada",
            secondary: "#dadada",
            disabled: "#dadada"
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                color: "#3ea0fd",
            }
        }
    }
});
function App() {
  return (
      <ThemeProvider theme={MuiTheme}>
      <Router>
          <ScrollToTop />
          <header>
            <Header />
          </header>
          <div className="mainViewer">
              <Routes>
                  <Route index path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/contact" element={<Contact />} />


                  <Route path="/mirrorboard" element={<Mirrorboard />} />
              </Routes>
          </div>
      </Router>
      </ThemeProvider>
  );
}

export default App;
