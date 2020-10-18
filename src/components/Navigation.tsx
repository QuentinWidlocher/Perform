import React, { FC } from "react"
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import { Box, BoxProps, Flex, Link as RebassLink, LinkProps as RebassLinkProps } from 'rebass';

export type LinkItem = {
  name: string | JSX.Element,
  url: string,
  page: FC,
  props?: any,
}

export type NavbarProps = {
    links: LinkItem[]
}

export var Navbar = ({links}: NavbarProps) => {

    var liStyle: BoxProps = {
      as: 'li',
      fontSize: '2rem',
      p: 3,
      sx: {
        listStyle: 'none', 
      }
    }

    var aStyle: RebassLinkProps = {
        color: 'white',
        sx: {
          textDecoration: 'none'
        }
    }

    var activeLink = {
        display: 'none'
    }

    var CustomLink = (props: RebassLinkProps) => <RebassLink {...{...aStyle, ...props}}/>

    var routerLinks = links.map(({name, url}) => (
      <Box {...liStyle}>
        <NavLink to={url} component={CustomLink} activeStyle={activeLink} exact={true}>{name}</NavLink>
      </Box>
    ))

    return (
    <Flex as='nav' width='100vw' justifyContent='flex-end' sx={{position: 'absolute'}}>
      <Flex as='ul' justifyContent='space-around' p={0} m={0}>
        {routerLinks}
      </Flex>
    </Flex>
  )
}

export type RouterOutletProps = {
    links: LinkItem[]
}

export var RouterOutlet = ({links}: RouterOutletProps) => {
    var routerPages = links.map(({url, page}) => (
      <Route path={url} exact key={url}>{page}</Route>
    ))

    return (
    <Switch>
      {routerPages}
    </Switch>
  )
}