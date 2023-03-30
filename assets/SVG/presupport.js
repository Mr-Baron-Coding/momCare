import React from 'react'
import Svg, { Mask, Path, Rect } from 'react-native-svg'

export default function presupport({ width = '50', height = "50", color = '#562349', stroke = '#562349', strokeWidth = '2', linecap = 'round' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path 
            d="M25.5027 14.3969C28.9671 14.3969 31.7755 11.5885 31.7755 8.12418C31.7755 4.65984 28.9671 1.85144 25.5027 1.85144C22.0384 1.85144 19.23 4.65984 19.23 8.12418C19.23 11.5885 22.0384 14.3969 25.5027 14.3969Z"
            stroke="#562349" stroke-width="2.35492" stroke-miterlimit="10" stroke-linecap="round"
        />
        <Path 
            d="M25.5027 18.5787C17.139 18.5787 13.4102 20.0377 11.5633 31.1242C10.1693 39.4878 5.98749 42.2757 1.80566 39.4878"
            stroke="#562349" stroke-width="2.35492" stroke-miterlimit="10" stroke-linecap="round"
        />
        <Path 
            d="M25.5027 18.5787C33.8663 18.5787 37.5951 20.0377 39.4421 31.1242C40.836 39.4878 45.0179 42.2757 49.1997 39.4878"
            stroke="#562349" stroke-width="2.35492" stroke-miterlimit="10" stroke-linecap="round"
        />
        <Path 
            d="M18.5329 28.3364V36.7C18.5329 42.2758 4.59351 43.6697 4.59351 50.6394C4.59351 58.5965 12.4739 57.5441 20.0569 54.6911"
            stroke="#562349" stroke-width="2.35492" stroke-miterlimit="10" stroke-linecap="round"
        />
        <Path 
            d="M32.4719 28.3363V36.7C32.4719 43.6697 46.4113 43.6697 46.4113 50.6394C46.4113 60.5642 34.1539 56.473 25.5022 52.3516"
            stroke="#562349" stroke-width="2.35492" stroke-miterlimit="10" stroke-linecap="round"
        />
        <Path 
            d="M17.1389 47.8514C17.1389 47.8514 20.7864 50.1073 25.5026 52.3515"
            stroke="#562349" stroke-width="2.35492" stroke-miterlimit="10" stroke-linecap="round"
        />
        
    </Svg>
       
  )
};