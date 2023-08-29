import "./WorkCardStyle.css"
import WorkCard from "./WorkCard"
import WorkCardData from "./WorkCardData"
import React from 'react'

const Work = () => {
  return (
    <div className="work-container">
        <div className="games-container">
            {WorkCardData.map((val,ind)=>{
                return (
                    <WorkCard key={ind}
                    pc={val.imgsrc}
                    title={val.title}
                    text={val.text}
                    view={val.view}
                    source={val.groups}
                    />
                    
                )
            })}
        </div>
    </div>
  )
}

export default Work