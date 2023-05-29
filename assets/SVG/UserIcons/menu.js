<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1.73462" y1="1.74329" x2="18.2165" y2="1.74329" stroke="#FFF2E6" stroke-width="2" stroke-linecap="round"/>
<line x1="1.73462" y1="6.24176" x2="18.2165" y2="6.24176" stroke="#FFF2E6" stroke-width="2" stroke-linecap="round"/>
<line x1="1.73462" y1="10.7403" x2="18.2165" y2="10.7403" stroke="#FFF2E6" stroke-width="2" stroke-linecap="round"/>
</svg>


import React from 'react'
import Svg, { Line } from 'react-native-svg'

export default function MenuIcon({ width = '30', height = "28", stroke = '#FFF2E6', strokeWidth = '2', strokeLinecap = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox="-2 -4 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Line x1={1.73462} y1={1.74329} x2={18.2165} y2={1.74329} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
        <Line x1={1.73462} y1={6.24176} x2={18.2165} y2={6.24176} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
        <Line x1={1.73462} y1={10.7403} x2={18.2165} y2={10.7403} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
    </Svg>
  )
};