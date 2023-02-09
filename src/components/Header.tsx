import React from "react";
import "./Header.css";
import {Avatar} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";


function Header() {

    const navigate = useNavigate();

  return (
      <nav>
          <Link to="/" style={{ textDecoration: 'none' }}>
              <Avatar className="header-button" alt="Hanmin Kim" src="/logo512.png" variant="rounded" />
          </Link>
          {/*<p className="header-button" onClick={undefined}>Featured</p>*/}
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <p className="header-button">Projects</p>
          </Link>
          <Link to="/tools" style={{ textDecoration: 'none' }}>
            <p className="header-button">Tools</p>
          </Link>
          {/*<p className="header-button" onClick={undefined}>About</p>*/}
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <p className="header-button">Contact</p>
          </Link>
      </nav>

  );
}

export default Header;