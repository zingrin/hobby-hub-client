import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../Context/Context/Contex';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
          HobbyHub
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/">Home</Link>
          <Link to="/groups">All Groups</Link>
          {user && (
            <>
              <Link to="/create-group">Create Group</Link>
              <Link to="/my-groups">My Groups</Link>
            </>
          )}
        </nav>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setIsOpen(!isOpen)}>
                {user.name}
              </button>
              {isOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, background: '#f9f9f9', border: '1px solid #ddd', padding: '10px' }}>
                  <p>{user.email}</p>
                  <Link to="/my-groups" onClick={() => setIsOpen(false)}>My Groups</Link><br />
                  <Link to="/create-group" onClick={() => setIsOpen(false)}>Create Group</Link><br />
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
