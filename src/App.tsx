import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { LinkItem, Navbar, RouterOutlet } from './components/Navigation';
import { HomePage } from './pages/Home';
import { SettingsPage } from './pages/Settings';
import { RiHome2Line, RiSettings3Line } from 'react-icons/ri'
import { MdFitnessCenter } from 'react-icons/md'
import { ExercisesPage } from './pages/Exercises';
import { Box } from 'rebass';
import { WorkoutPage } from './pages/Workout';

export default function App() {

  var onHomePage = !!useRouteMatch({ path: '/', exact: true })
  var onWorkoutPage = !!useRouteMatch({ path: '/workout', exact: true })

  var links: LinkItem[] = [
    { Page: HomePage, name: <RiHome2Line />, url: '/', showInNavbar: true },
    { Page: ExercisesPage, name: <MdFitnessCenter />, url: '/exercises', showInNavbar: true },
    { Page: SettingsPage, name: <RiSettings3Line />, url: '/settings', showInNavbar: true },
    { Page: WorkoutPage, name: 'Workout', url: '/workout', showInNavbar: false },
  ]

  return (
    <Box sx={{ fontFamily: 'body' }}>
      {!onWorkoutPage && <Navbar {...{ links }} onHero={onHomePage} />}
      <RouterOutlet {...{ links }} />
    </Box>
  );
}
