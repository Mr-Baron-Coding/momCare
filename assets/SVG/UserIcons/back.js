<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4822 6.53793H3.62218L7.25218 2.17793C7.42192 1.97372 7.50358 1.71044 7.4792 1.44601C7.45482 1.18158 7.32639 0.937673 7.12218 0.767934C6.91796 0.598196 6.65468 0.516534 6.39025 0.540914C6.12583 0.565293 5.88192 0.693718 5.71218 0.897934L0.712178 6.89793C0.678538 6.94566 0.648457 6.99579 0.622178 7.04793C0.622178 7.09793 0.622178 7.12793 0.552178 7.17793C0.506851 7.29259 0.483119 7.41465 0.482178 7.53793C0.483119 7.66122 0.506851 7.78328 0.552178 7.89793C0.552178 7.94793 0.552178 7.97793 0.622178 8.02793C0.648457 8.08007 0.678538 8.13021 0.712178 8.17793L5.71218 14.1779C5.8062 14.2908 5.92394 14.3816 6.05702 14.4438C6.19011 14.506 6.33527 14.5382 6.48218 14.5379C6.71583 14.5384 6.94227 14.457 7.12218 14.3079C7.22344 14.224 7.30714 14.1209 7.36849 14.0045C7.42984 13.8882 7.46764 13.7609 7.47971 13.6299C7.49179 13.4989 7.47791 13.3669 7.43886 13.2413C7.39982 13.1157 7.33638 12.999 7.25218 12.8979L3.62218 8.53793H15.4822C15.7474 8.53793 16.0017 8.43258 16.1893 8.24504C16.3768 8.0575 16.4822 7.80315 16.4822 7.53793C16.4822 7.27272 16.3768 7.01836 16.1893 6.83083C16.0017 6.64329 15.7474 6.53793 15.4822 6.53793Z" fill="#FFF2E6"/>
</svg>


import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function logo({ width = '30', height = "30", color = '#FFF2E6' }) {
  return (
    <Svg width={width} height={height} viewBox="0 -4 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path 
            d="M15.4822 6.53793H3.62218L7.25218 2.17793C7.42192 1.97372 7.50358 1.71044 7.4792 1.44601C7.45482 1.18158 7.32639 0.937673 7.12218 0.767934C6.91796 0.598196 6.65468 0.516534 6.39025 0.540914C6.12583 0.565293 5.88192 0.693718 5.71218 0.897934L0.712178 6.89793C0.678538 6.94566 0.648457 6.99579 0.622178 7.04793C0.622178 7.09793 0.622178 7.12793 0.552178 7.17793C0.506851 7.29259 0.483119 7.41465 0.482178 7.53793C0.483119 7.66122 0.506851 7.78328 0.552178 7.89793C0.552178 7.94793 0.552178 7.97793 0.622178 8.02793C0.648457 8.08007 0.678538 8.13021 0.712178 8.17793L5.71218 14.1779C5.8062 14.2908 5.92394 14.3816 6.05702 14.4438C6.19011 14.506 6.33527 14.5382 6.48218 14.5379C6.71583 14.5384 6.94227 14.457 7.12218 14.3079C7.22344 14.224 7.30714 14.1209 7.36849 14.0045C7.42984 13.8882 7.46764 13.7609 7.47971 13.6299C7.49179 13.4989 7.47791 13.3669 7.43886 13.2413C7.39982 13.1157 7.33638 12.999 7.25218 12.8979L3.62218 8.53793H15.4822C15.7474 8.53793 16.0017 8.43258 16.1893 8.24504C16.3768 8.0575 16.4822 7.80315 16.4822 7.53793C16.4822 7.27272 16.3768 7.01836 16.1893 6.83083C16.0017 6.64329 15.7474 6.53793 15.4822 6.53793Z"            
            fill={color} 
        />            

    </Svg>
  )
};