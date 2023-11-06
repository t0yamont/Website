import type { Config } from 'tailwindcss'

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
        700: '#b8231d', // Default Red
        800: '#a9251e',
        900: '#7f241f',
        950: '#450c0a',
      },
    },
    extend: {
      height: {
        '3/4-screen': '75vh'
      },
      maxHeight: {
        'inherit': 'inherit',
      },
      justifyItems: {
        'flex-start': 'flex-start',
        'flex-end': 'flex-end,'
      }
    },
  },
  plugins: [],
} satisfies Config

