import { Link, NavLink } from 'react-router-dom';

const NavigationBar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Navbar
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='movies'>
                Movies
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='customer'>
                Customers
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='rentals'>
                Rentals
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='posts'>
                Posts
              </NavLink>
            </li>
            {!user && (
              <>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='login'>
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='register'>
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='profile'>
                    {user.name}
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='logout'>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
