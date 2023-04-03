{/* <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5142 4.24749C18.221 3.56872 17.7983 2.95363 17.2698 2.43664C16.7408 1.91811 16.1171 1.50605 15.4327 1.22285C14.7229 0.928024 13.9617 0.777116 13.1932 0.778885C12.115 0.778885 11.063 1.07413 10.1488 1.63182C9.93014 1.76523 9.72237 1.91176 9.52554 2.07141C9.32871 1.91176 9.12094 1.76523 8.90224 1.63182C7.98807 1.07413 6.93611 0.778885 5.85791 0.778885C5.08152 0.778885 4.32919 0.927602 3.61841 1.22285C2.93169 1.50716 2.31277 1.91613 1.78132 2.43664C1.25206 2.95304 0.829265 3.56828 0.53691 4.24749C0.232915 4.9539 0.0776367 5.70404 0.0776367 6.47606C0.0776367 7.20433 0.226354 7.96323 0.521601 8.73524C0.768733 9.38041 1.12303 10.0496 1.57574 10.7254C2.29308 11.7949 3.27943 12.9103 4.50415 14.0409C6.5337 15.9152 8.54357 17.2099 8.62886 17.2624L9.14718 17.5948C9.37682 17.7414 9.67207 17.7414 9.9017 17.5948L10.42 17.2624C10.5053 17.2077 12.513 15.9152 14.5447 14.0409C15.7695 12.9103 16.7558 11.7949 17.4731 10.7254C17.9259 10.0496 18.2823 9.38041 18.5273 8.73524C18.8225 7.96323 18.9713 7.20433 18.9713 6.47606C18.9734 5.70404 18.8182 4.9539 18.5142 4.24749Z" fill="#FFE8E6"/>
</svg>
 */}

import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function logo({ width = '30', height = "30", color = 'white', stroke = '#562349', strokeWidth = '2.5', strokeLinejoin = 'round', strokeLinecap = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox="-10 -10 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path 
          d="M18.5142 4.24749C18.221 3.56872 17.7983 2.95363 17.2698 2.43664C16.7408 1.91811 16.1171 1.50605 15.4327 1.22285C14.7229 0.928024 13.9617 0.777116 13.1932 0.778885C12.115 0.778885 11.063 1.07413 10.1488 1.63182C9.93014 1.76523 9.72237 1.91176 9.52554 2.07141C9.32871 1.91176 9.12094 1.76523 8.90224 1.63182C7.98807 1.07413 6.93611 0.778885 5.85791 0.778885C5.08152 0.778885 4.32919 0.927602 3.61841 1.22285C2.93169 1.50716 2.31277 1.91613 1.78132 2.43664C1.25206 2.95304 0.829265 3.56828 0.53691 4.24749C0.232915 4.9539 0.0776367 5.70404 0.0776367 6.47606C0.0776367 7.20433 0.226354 7.96323 0.521601 8.73524C0.768733 9.38041 1.12303 10.0496 1.57574 10.7254C2.29308 11.7949 3.27943 12.9103 4.50415 14.0409C6.5337 15.9152 8.54357 17.2099 8.62886 17.2624L9.14718 17.5948C9.37682 17.7414 9.67207 17.7414 9.9017 17.5948L10.42 17.2624C10.5053 17.2077 12.513 15.9152 14.5447 14.0409C15.7695 12.9103 16.7558 11.7949 17.4731 10.7254C17.9259 10.0496 18.2823 9.38041 18.5273 8.73524C18.8225 7.96323 18.9713 7.20433 18.9713 6.47606C18.9734 5.70404 18.8182 4.9539 18.5142 4.24749Z" 
          fill={color}
          stroke={stroke} 
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin} 
      />      
    </Svg>
  )
};