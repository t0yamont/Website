import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const srcDir = __dirname;

export default {
  content: [
    `${srcDir}/components/**/*.{vue,js,ts}`,
    `${srcDir}/emails/**/*.vue`,
    `${srcDir}/layouts/**/*.vue`,
    `${srcDir}/pages/**/*.vue`,
    `${srcDir}/composables/**/*.{js,ts}`,
    `${srcDir}/plugins/**/*.{js,ts}`,
    `${srcDir}/utils/**/*.{js,ts}`,
    `${srcDir}/static/**/*.{html,js,ts,vue}`,
    `${srcDir}/App.{js,ts,vue}`,
    `${srcDir}/app.{js,ts,vue}`,
    `${srcDir}/Error.{js,ts,vue}`,
    `${srcDir}/error.{js,ts,vue}`,
    `${srcDir}/app.config.{js,ts}`
  ],
  theme: {
    colors: {
      background: '#201919',
      text: {
        50: '#f9f9f9',
        100: '#efefef',
        200: '#dcdcdc',
        300: '#bdbdbd',
        400: '#989898',
        500: '#7c7c7c',
        600: '#656565',
        700: '#525252',
        800: '#464646',
        900: '#3d3d3d',
        950: '#292929',
      },
      surtes: {
        50: '#fef2f2',
        100: '#fee3e2',
        200: '#feccca',
        300: '#fba9a6',
        400: '#f77772',
        500: '#ee4c45',
        600: '#db2e27',
        700: '#b8231d',
        800: '#a9251e',
        900: '#7f241f',
        950: '#450c0a',
      },
      gold: {
        50: '#fcfcea',
        100: '#f9f8c8',
        200: '#f5ef93',
        300: '#eedf56',
        400: '#e7cc28',
        500: '#ccab19',
        600: '#ba8e14',
        700: '#946814',
        800: '#7b5218',
        900: '#69441a',
        950: '#3d240b',
      },
      blue: {
        50: '#e9faff',
        100: '#cff3ff',
        200: '#a9edff',
        300: '#6ee5ff',
        400: '#2ad1ff',
        500: '#00adff',
        600: '#0084ff',
        700: '#006aff',
        800: '#005ae2',
        900: '#0051b0',
        950: '#023979',
      },
      mint: {
        50: '#edfff9',
        100: '#d5fff3',
        200: '#aeffe7',
        300: '#70ffd6',
        400: '#2bfdbe',
        500: '#00ffb3',
        600: '#00c082',
        700: '#009669',
        800: '#067555',
        900: '#076048',
        950: '#003727',
      },
    },
    extend: {
      height: {
        '1/4-screen': '25vh',
        '1/3-screen': '33vh',
        '2/3-screen': '66vh',
        '3/4-screen': '75vh'
      },
      minHeight: {
        '1/4-screen': '25vh',
        '1/3-screen': '33vh',
        '1/2-screen': '55vh',
        '2/3-screen': '66vh',
        '3/4-screen': '75vh',
      },
      maxHeight: {
        'inherit': 'inherit',
        '1/4-screen': '25vh',
        '1/3-screen': '33vh',
        '1/2-screen': '55vh',
        '2/3-screen': '66vh',
        '3/4-screen': '75vh',
      },
      maxWidth: {
        '8xl': '80rem',
        '9xl': '88rem',
      },
      justifyItems: {
        'flex-start': 'flex-start',
        'flex-end': 'flex-end',
      }
    },
    fluidType: {
      settings: {
        fontSizeMin: 1.2,
        fontSizeMax: 1.4,
        ratioMin: 1.125,
        ratioMax: 1.2,
        screenMin: 20,
        screenMax: 96,
        unit: 'rem',
        prefix: '',
      },
      values: {
        'xs': [-2, 1.6],
        'sm': [-1, 1.6],
        'base': [0, 1.6],
        'lg': [1, 1.6],
        'xl': [2, 1.4],
        '2xl': [3, 1.3],
        '3xl': [4, 1.2],
        '4xl': [5, 1.2],
        '5xl': [6, 1.2],
        '6xl': [7, 1.1],
        '7xl': [8, 1.1],
        '8xl': [9, 1.1],
        '9xl': [10, 1],
      }
    },
    fontFamily: {
      onest: ['Onest', ...fontFamily.sans]
    }
  },
  plugins: [
    require('tailwindcss-fluid-type'),
  ],
} satisfies Config

