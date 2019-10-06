import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import './styles.scss';

export default function NavigationMenu() {
  let currentPage = window.location.pathname;
  if (currentPage === '/') {
    currentPage = '/boat';
  }

  // return <div>hi</div>;

  return (
    <div>
      <div className="title">Cyrille Gindreau</div>

      <div className="icons">
        <SocialIcon
          style={{ height: 25, width: 25, marginLeft: '6px', marginRight: '6px' }}
          url="https://www.facebook.com/cyrille.gindreau"
        />
        <SocialIcon
          style={{ height: 25, width: 25, marginLeft: '6px', marginRight: '6px' }}
          url="https://www.instagram.com/cyrillegin/"
        />
        <SocialIcon
          style={{ height: 25, width: 25, marginLeft: '6px', marginRight: '6px' }}
          url="https://github.com/cyrillegin"
        />
        <SocialIcon
          style={{ height: 25, width: 25, marginLeft: '6px', marginRight: '6px' }}
          url="https://twitter.com/cyrillegin"
        />
        <SocialIcon
          style={{ height: 25, width: 25, marginLeft: '6px', marginRight: '6px' }}
          url="https://www.linkedin.com/in/cyrille-gindreau-77008417/"
        />
      </div>

      <div className="menu-group">
        <Link to="/boat" className={currentPage === '/boat' ? 'selected-menu-item' : 'menu-item'}>
          Boat Builder
        </Link>
        <Link
          to="/visualization"
          className={currentPage === '/visualization' ? 'selected-menu-item' : 'menu-item'}
        >
          Data Visualization
        </Link>
        <Link
          to="/dragonfly"
          className={currentPage === '/dragonfly' ? 'selected-menu-item' : 'menu-item'}
        >
          Dragonfly
        </Link>
      </div>
    </div>
  );
}
