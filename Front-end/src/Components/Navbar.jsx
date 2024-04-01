import { Link ,useNavigate } from "react-router-dom";
import { Dropdown, Nav, NavDropdown } from "react-bootstrap";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user-info'))
 const navigate=useNavigate();
 function logout(){
  localStorage.clear();
  navigate('/login')
; }
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
      aria-label="Main navigation"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Home Page
        </a>
        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          id="navbarSideCollapse"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="navbar-collapse offcanvas-collapse"
          id="navbarsExampleDefault"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem("user-info") ? (
              <>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/add">
                    Add User
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {localStorage.getItem("user-info") ? (
        <Nav>
          <NavDropdown title={user&& user.user.name}>
            <Dropdown.Item className="text-danger">Profile</Dropdown.Item>
            <Dropdown.Item onClick={logout} className="text-danger">Logout</Dropdown.Item>
          </NavDropdown>
        </Nav>):null}
      </div>
    </nav>
  );
}

export default Navbar;
