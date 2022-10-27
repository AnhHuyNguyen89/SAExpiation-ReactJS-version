import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                  <Link className="navbar-brand" to="/">SA Expiation</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavAltMarkup">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                        {/* Display the navigation bar */}
                        {/* TO is used for navigating to the link need to access */}
                          <Link className="nav-link" to="/ExpiationList">Expiation List</Link>
                          <Link className="nav-link" to="/LocalService">Local Service List</Link>
                      </div>
                  </div>
              </div>
          </nav>
          {/* Outlet will help to display all the context from SPA page is linked above. */}
          <Outlet /> 
    </div>
  );
}

export default App;
