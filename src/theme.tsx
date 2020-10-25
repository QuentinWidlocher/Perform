import React from "react"
import { Box, BoxProps } from "rebass"

var spacer = 1
var borderWidth = '3px'
var borderRadius = 4

export var theme = {
  breakpoints: ['50em', '70em', '80em'],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  colors: {
    primary: '#f44336',
    primaryContrast: 'white',
    primaryLight: '#ff7961',
    primaryDark: '#ba000d',

    red: '#f44336',
    redLight: '#ff7961',
    redDark: '#ba000d',

    pink: '#e91e63',
    pinkLight: '#ff6090',
    pinkDark: '#b0003a',

    purple: '#9c27b0',
    purpleLight: '#d05ce3',
    purpleDark: '#6a0080',

    deepPurple: '#673ab7',
    deepPurpleLight: '#9a67ea',
    deepPurpleDark: '#320b86',

    indigo: '#3f51b5',
    indigoLight: '#757de8',
    indigoDark: '#002984',

    blue: '#2196f3',
    blueLight: '#6ec6ff',
    blueDark: '#0069c0',

    lightBlue: '#03a9f4',
    lightBlueLight: '#67daff',
    lightBlueDark: '#007ac1',

    cyan: '#00bcd4',
    cyanLight: '#62efff',
    cyanDark: '#008ba3',

    teal: '#009688',
    tealLight: '#52c7b8',
    tealDark: '#00675b',

    green: '#4caf50',
    greenLight: '#80e27e',
    greenDark: '#087f23',

    lighGreen: '#8bc34a',
    lighGreenLight: '#bef67a',
    lighGreenDark: '#5a9216',

    lime: '#cddc39',
    limeLight: '#ffff6e',
    limeDark: '#99aa00',

    yellow: '#ffeb3b',
    yellowLight: '#ffff72',
    yellowDark: '#c8b900',

    amber: '#ffc107',
    amberLight: '#fff350',
    amberDark: '#c79100',

    orange: '#ff9800',
    orangeLight: '#ffc947',
    orangeDark: '#c66900',

    deepOrange: '#ff5722',
    deepOrangeLight: '#ff8a50',
    deepOrangeDark: '#c41c00',

    brown: '#795548',
    brownLight: '#a98274',
    brownDark: '#4b2c20',

    grey: '#9e9e9e',
    greyLight: '#cfcfcf',
    greyDark: '#707070',

    blueGrey: '#607d8b',
    blueGreyLight: '#8eacbb',
    blueGreyDark: '#34515e',

  },
  borderWidth,
  space: [
    0, `${0.25 * spacer}rem`, `${0.5 * spacer}rem`, `${1 * spacer}rem`, `${1.5 * spacer}rem`, `${3 * spacer}rem`
  ],
  fonts: {
    body: '"Source Sans Pro", system-ui, sans-serif',
    heading: '\'Sora\', sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 10px rgba(0, 0, 0, .125)',
  },
  variants: {
    gradient: {
      background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
    },
    card: {
      bg: 'white',
      borderRadius: 10,
      boxShadow: 'small',

      image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        objectFit: 'cover',
        width: '100%',
        height: '20rem',
      },

      clickable: {
        bg: 'white',
        borderRadius: 10,
        boxShadow: 'small',
        cursor: 'pointer',

        '&:hover, &:active': {
          boxShadow: 'large'
        },
      },

      body: {
        p: 3,
      }
    },
    badge: {
      p: 1,
      m: 1,
      borderStyle: 'solid',
      borderRadius,
      fontSize: 0,

      '&:first-of-type': {
        ml: 0,
      },
      '&:last-of-type': {
        mr: 0,
      },
    }
  },
  text: {
  },
  buttons: {
    primary: {
      color: 'primaryContrast',
      bg: 'primary',

      '&:hover': {
        bg: 'primaryLight',
      },

      hero: {
        outline: {
          bg: 'transparent',
          border: `solid ${borderWidth}`,
          borderColor: 'white',
          '&:hover, &:active': {
            bg: 'white',
            color: 'primary'
          },
        },
        full: {
          color: 'primary',
          bg: 'white',
          border: `solid ${borderWidth}`,
          borderColor: 'white',
          '&:hover, &:active': {
            color: 'white',
            bg: 'primary',
          },
        }
      }
    },
    primaryGradient: {
      background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
    },
  }
}

export var Container = (props: BoxProps) => (
  <Box
    px={[2, 3, 5]}
    mx={[0, 'auto', 'auto']}
    maxWidth={['100vw', '90vw', '80vw']} {...props}
  />
)