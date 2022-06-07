import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
  <ContentLoader
    className = "pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="130" r="125" /> 
    <rect x="2" y="274" rx="10" ry="10" width="279" height="24" /> 
    <rect x="0" y="316" rx="10" ry="10" width="280" height="86" /> 
    <rect x="0" y="418" rx="10" ry="10" width="90" height="27" /> 
    <rect x="147" y="412" rx="20" ry="20" width="132" height="40" /> 

  </ContentLoader>
)



