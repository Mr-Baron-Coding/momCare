import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function logo({ width = '30', height = "30", color = 'white', stroke = '#562349', strokeWidth = '1.5', strokeLinejoin = 'round', strokeLinecap = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* <Rect 
            x={0.304199} y={0.697449} width={21.1232} height={21.1232} rx={10.5616} fill='#FF7878'
        /> */}
        <Path 
            d="M5.10376 7.81021C5.10376 7.50532 5.22517 7.21292 5.44129 6.99732C5.65741 6.78173 5.95053 6.66061 6.25616 6.66061H15.4754C15.781 6.66061 16.0742 6.78173 16.2903 6.99732C16.5064 7.21292 16.6278 7.50532 16.6278 7.81021V14.7078C16.6278 15.0127 16.5064 15.3051 16.2903 15.5207C16.0742 15.7363 15.781 15.8574 15.4754 15.8574H6.25616C5.95053 15.8574 5.65741 15.7363 5.44129 15.5207C5.22517 15.3051 5.10376 15.0127 5.10376 14.7078V7.81021Z" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin} 
        />      
        <Path 
            d="M5.10376 8.95984L9.42586 12.4092C9.83455 12.7354 10.3424 12.9131 10.8658 12.9131C11.3892 12.9131 11.897 12.7354 12.3057 12.4092L16.6278 8.95984" 
            fill={color}
            stroke={stroke} 
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin} 
        />      

    </Svg>
  )
};