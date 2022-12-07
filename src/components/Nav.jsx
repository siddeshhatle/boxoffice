import React, { memo }from 'react';
import { useLocation } from 'react-router';
import { LinkStyled, NavList } from './Navs.styled';

const LINKS = [
    { to : '/', text: 'Home Page' },
    { to : '/starred', text: 'Starred Page' }
]

const Nav = () => {

const location = useLocation();

// console.log('Loaction', location)

  return (
    <div>
        <NavList>
            {
                LINKS.map(item => 
                  (
                  <li key={item.to}>
                    <LinkStyled to={item.to} className={item.to === location.pathname ? 'active' : '' }>{item.text}</LinkStyled>
                  </li>
                  )
                )
            }
        </NavList>
    </div>
  )
}

export default memo(Nav)