import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function BurguerBtnSVG({color, width, height}) {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="bars"
      className="prefix__svg-inline--fa prefix__fa-bars prefix__fa-w-14"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={width}
      height={height}
    >
      <Path
        fill={color}
        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
      />
    </Svg>
  )
}
