import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default function homoyo({ width = '50', height = "50", color = 'white', stroke = '#562349', strokeWidth = '4', strokeLinecap = 'round', strokeLinejoin = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox='0 0 105 110' fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path 
            d="M80.496 28.4968C83.3242 25.9283 84.9839 22.9194 84.9839 19.6847C84.9839 10.3307 71.3339 2.74927 54.5 2.74927C37.6661 2.74927 24.0161 10.3307 24.0161 19.6847C24.0161 22.9194 25.6758 25.9283 28.504 28.4968" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin} 
        />
        <Path 
            d="M80.4958 28.4969C75.1386 33.363 65.5192 36.6203 54.4999 36.6203C43.4805 36.6203 33.8612 33.363 28.5039 28.4969" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        <Path 
            d="M87.8571 56.9428C80.8119 63.0453 68.5224 67.1041 54.4998 67.1041C40.4772 67.1041 28.1877 63.0453 21.1426 56.9428" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        <Path 
            d="M54.4998 94.2009C40.4772 94.2009 28.1877 90.142 21.1426 84.0396" 
            // fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        {/* <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5435 6.70935C12.2053 6.70935 5.774 4.58528 2.08716 1.39178" stroke="#562349" stroke-width="2.3713" stroke-linecap="round" stroke-linejoin="round"/>
</svg> */}

        <Path 
            d="M21.1426 56.9428C17.191 53.5162 14.8708 49.4573 14.8708 45.088C14.8708 38.4606 20.166 32.5331 28.5039 28.4969" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        <Path 
            d="M87.8572 56.9428C91.8088 53.5162 94.1289 49.4573 94.1289 45.088C94.1289 38.4606 88.8338 32.5331 80.4958 28.4969" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        <Path 
            d="M21.1426 56.9428C9.86355 62.2267 2.67725 70.1243 2.67725 78.959C2.67725 94.8614 25.8789 107.749 54.4998 107.749C83.1208 107.749 106.322 94.8614 106.322 78.959C106.322 70.1243 99.1418 62.2211 87.8571 56.9428" 
            // fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} 
            strokeLinejoin={strokeLinejoin} 
        />
        

    </Svg>
  )
};

// {/* <svg width="109" height="110" viewBox="0 0 109 110" fill="none" xmlns="http://www.w3.org/2000/svg">
// {/* <path d="M80.496 28.4968C83.3242 25.9283 84.9839 22.9194 84.9839 19.6847C84.9839 10.3307 71.3339 2.74927 54.5 2.74927C37.6661 2.74927 24.0161 10.3307 24.0161 19.6847C24.0161 22.9194 25.6758 25.9283 28.504 28.4968" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/> */}
// {/* <path d="M80.4958 28.4969C75.1386 33.363 65.5192 36.6203 54.4999 36.6203C43.4805 36.6203 33.8612 33.363 28.5039 28.4969" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/> */}
// {/* <path d="M87.8571 56.9428C80.8119 63.0453 68.5224 67.1041 54.4998 67.1041C40.4772 67.1041 28.1877 63.0453 21.1426 56.9428" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/> */}
// <path d="M54.4998 94.2009C40.4772 94.2009 28.1877 90.142 21.1426 84.0396" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M21.1426 56.9428C17.191 53.5162 14.8708 49.4573 14.8708 45.088C14.8708 38.4606 20.166 32.5331 28.5039 28.4969" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M87.8572 56.9428C91.8088 53.5162 94.1289 49.4573 94.1289 45.088C94.1289 38.4606 88.8338 32.5331 80.4958 28.4969" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M21.1426 56.9428C9.86355 62.2267 2.67725 70.1243 2.67725 78.959C2.67725 94.8614 25.8789 107.749 54.4998 107.749C83.1208 107.749 106.322 94.8614 106.322 78.959C106.322 70.1243 99.1418 62.2211 87.8571 56.9428" stroke="#562349" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg> */}
