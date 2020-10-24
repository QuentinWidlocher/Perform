import React from 'react';
import { BrowserRouter as Router, useRouteMatch } from 'react-router-dom';
import { LinkItem, Navbar, RouterOutlet } from './components/Navigation';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { RiHome2Line, RiSettings3Line } from 'react-icons/ri'
import { MdFitnessCenter } from 'react-icons/md'
import { Exercises } from './pages/Exercises';

export default function App() {

  var onHomePage = !!useRouteMatch({ path: '/', exact: true })

  var links: LinkItem[] = [
    { name: <RiHome2Line />, url: '/', page: Home },
    { name: <MdFitnessCenter />, url: '/exercises', page: Exercises },
    { name: <RiSettings3Line />, url: '/settings', page: Settings },
  ]

  return (
    <div className="app">
      <Navbar {...{ links }} onHero={onHomePage} />
      <RouterOutlet {...{ links }} />
    </div>
  );
}
