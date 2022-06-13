import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="125" /> 
    <rect x="0" y="275" rx="10" ry="10" width="280" height="23" /> 
    <rect x="0" y="316" rx="10" ry="10" width="280" height="80" /> 
    <rect x="0" y="425" rx="10" ry="10" width="95" height="30" /> 
    <rect x="128" y="415" rx="24" ry="24" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton;