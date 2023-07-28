import "./WorkCardStyle.css"
import WorkCard from "./WorkCard"
import WorkCardData from "./WorkCardData"
import React from 'react'

const Work = () => {
  return (
    <div className="work-container">
        {/* <h1 className="games-heading">Games</h1> */}
        <div className="games-container">
            {WorkCardData.map((val,ind)=>{
                return (
                    <WorkCard key={ind}
                    pc={val.imgsrc}
                    title={val.title}
                    text={val.text}
                    // view={val.view}
                    Groups={val.Groups}
                    />
                    
                )
            })}
        </div>
    </div>
  )
}

export default Work