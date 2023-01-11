import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton:React.FC = () => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   >
      <circle cx="134" cy="124" r="120" />
      <rect x="544" y="528" rx="2" ry="2" width="140" height="10" />
      <rect x="502" y="515" rx="2" ry="2" width="140" height="10" />
      <rect x="457" y="378" rx="2" ry="2" width="400" height="400" />
      <rect x="4" y="270" rx="9" ry="9" width="273" height="21" />
      <rect x="3" y="312" rx="11" ry="11" width="274" height="85" />
      <rect x="124" y="419" rx="32" ry="32" width="157" height="46" />
      <rect x="0" y="428" rx="10" ry="10" width="91" height="29" />
   </ContentLoader>
)

export default Skeleton