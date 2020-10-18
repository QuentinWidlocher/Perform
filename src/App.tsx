import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LinkItem, Navbar, RouterOutlet } from './components/Navigation';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { RiHome2Line, RiSettings3Line } from 'react-icons/ri'

export default function App() {

  var links: LinkItem[] = [
    { name: <RiHome2Line/>, url: '/', page: Home },
    { name: <RiSettings3Line/>, url: '/settings', page: Settings },
  ]

  return (
    <Router>
      <Navbar {...{links}}/>
      <RouterOutlet {...{links}}/>
    </Router>
  );
}
