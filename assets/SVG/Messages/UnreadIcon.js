import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function UnreadIcon({ width = '46', height = "46", color = '#562349' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect 
            x="0.5" y="0.287109" width="45" height="45" rx="22.5" fill="#AD6989"
        />
        <Path 
            d="M12.0886 16.2563C12.0886 15.6789 12.3185 15.1252 12.7278 14.717C13.137 14.3087 13.6921 14.0793 14.2709 14.0793H31.7289C32.3077 14.0793 32.8627 14.3087 33.272 14.717C33.6812 15.1252 33.9111 15.6789 33.9111 16.2563V29.3179C33.9111 29.8953 33.6812 30.449 33.272 30.8573C32.8627 31.2655 32.3077 31.4949 31.7289 31.4949H14.2709C13.6921 31.4949 13.137 31.2655 12.7278 30.8573C12.3185 30.449 12.0886 29.8953 12.0886 29.3179V16.2563Z" 
            stroke="white" 
            strokeLinejoin='round'
            strokeWidth={2}
            strokeLinecap='round'
        />
        <Path 
            d="M12.0889 18.4331L20.2734 24.965C21.0473 25.5827 22.009 25.9193 23.0001 25.9193C23.9913 25.9193 24.9529 25.5827 25.7269 24.965L33.9114 18.4331" 
            stroke="white" 
            strokeLinejoin='round'
            strokeWidth={2}
        />
    </Svg>
  )
};