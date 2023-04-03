<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.190918" y="0.680237" width="21.1232" height="21.1232" rx="10.5616" fill="#FF7878"/>
<path d="M15.2172 15.7067L13.1089 13.5946L15.2172 15.7067ZM14.2773 10.7719C14.2773 11.8314 13.8564 12.8475 13.1072 13.5966C12.358 14.3458 11.3419 14.7667 10.2824 14.7667C9.22294 14.7667 8.20683 14.3458 7.45766 13.5966C6.70848 12.8475 6.2876 11.8314 6.2876 10.7719C6.2876 9.71238 6.70848 8.69628 7.45766 7.9471C8.20683 7.19792 9.22294 6.77704 10.2824 6.77704C11.3419 6.77704 12.358 7.19792 13.1072 7.9471C13.8564 8.69628 14.2773 9.71238 14.2773 10.7719Z" fill="#FF7878"/>
<path d="M15.2172 15.7067L13.1089 13.5946M14.2773 10.7719C14.2773 11.8314 13.8564 12.8475 13.1072 13.5966C12.358 14.3458 11.3419 14.7667 10.2824 14.7667C9.22294 14.7667 8.20683 14.3458 7.45766 13.5966C6.70848 12.8475 6.2876 11.8314 6.2876 10.7719C6.2876 9.71238 6.70848 8.69628 7.45766 7.9471C8.20683 7.19792 9.22294 6.77704 10.2824 6.77704C11.3419 6.77704 12.358 7.19792 13.1072 7.9471C13.8564 8.69628 14.2773 9.71238 14.2773 10.7719V10.7719Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>


import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function logo({ width = '30', height = "30", color = 'white', stroke = '#562349', strokeWidth = '1.5', strokeLinejoin = 'round', strokeLinecap = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* <Rect 
            x={0.304199} y={0.697449} width={21.1232} height={21.1232} rx={10.5616} fill='#FF7878'
        /> */}
        <Path 
            d="M15.2172 15.7067L13.1089 13.5946L15.2172 15.7067ZM14.2773 10.7719C14.2773 11.8314 13.8564 12.8475 13.1072 13.5966C12.358 14.3458 11.3419 14.7667 10.2824 14.7667C9.22294 14.7667 8.20683 14.3458 7.45766 13.5966C6.70848 12.8475 6.2876 11.8314 6.2876 10.7719C6.2876 9.71238 6.70848 8.69628 7.45766 7.9471C8.20683 7.19792 9.22294 6.77704 10.2824 6.77704C11.3419 6.77704 12.358 7.19792 13.1072 7.9471C13.8564 8.69628 14.2773 9.71238 14.2773 10.7719Z" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin} 
        />      
        <Path 
            d="M15.2172 15.7067L13.1089 13.5946M14.2773 10.7719C14.2773 11.8314 13.8564 12.8475 13.1072 13.5966C12.358 14.3458 11.3419 14.7667 10.2824 14.7667C9.22294 14.7667 8.20683 14.3458 7.45766 13.5966C6.70848 12.8475 6.2876 11.8314 6.2876 10.7719C6.2876 9.71238 6.70848 8.69628 7.45766 7.9471C8.20683 7.19792 9.22294 6.77704 10.2824 6.77704C11.3419 6.77704 12.358 7.19792 13.1072 7.9471C13.8564 8.69628 14.2773 9.71238 14.2773 10.7719V10.7719Z" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin} 
        />      

    </Svg>
  )
};