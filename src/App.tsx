import React, { FC } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';

type LinkItem = {
  name: string,
  url: string,
  page: FC,
  props?: any
}

export default function App() {

  var links: LinkItem[] = [
    { name: 'Home', url: '/', page: Home },
    { name: 'Settings', url: '/settings', page: Settings },
  ]

  var Navbar = () => {
    var routerLinks = links.map(({name, url}) => (
      <li><Link to={url}>{name}</Link></li>
    ))

    return null;

}

  var RouterOutlet = () => {
    var routerPages = links.map(({url, page}) => (
      <Route path={url} exact key={url}>{page}</Route>
    ))

    return (
    <Switch>
      {routerPages}
    </Switch>
  )
  }

  return (
    <Router>
      <Navbar/>
      <RouterOutlet/>
    </Router>
  );
}
