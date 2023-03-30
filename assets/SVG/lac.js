import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default function logo({ width = '50', height = "50", color = 'white', stroke = '#562349', strokeWidth = '2', strokeLinecap = 'round', strokeLinejoin = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 35 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path 
            d="M20.8152 36.5209C20.7783 41.7698 16.493 45.997 11.2441 45.96C5.99511 45.9231 1.76796 41.6378 1.80493 36.3889C1.87094 26.8837 11.4421 17.4446 11.4421 17.4446C11.4421 17.4446 20.8812 27.0157 20.8126 36.5209H20.8152Z" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin} 
        />
        <Path 
            d="M33.2002 13.7175C33.1757 17.2012 30.3316 20.0067 26.8479 19.9822C23.3642 19.9577 20.5586 17.1136 20.5832 13.6299C20.627 7.32133 26.9793 1.0566 26.9793 1.0566C26.9793 1.0566 33.244 7.40895 33.1985 13.7175H33.2002Z" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        

    </Svg>
  )
};