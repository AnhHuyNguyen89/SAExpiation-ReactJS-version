import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <Link className="navbar-brand" to="/">SA Expiation</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                          <Link className="nav-link active" to="/ExpiationList">Expiation List</Link>
                          <Link className="nav-link" to="/ExpiationList">Local Service List</Link>
                      </div>
                  </div>
              </div>
          </nav>
          <Outlet /> 
    </div>
  );
}

export default App;
