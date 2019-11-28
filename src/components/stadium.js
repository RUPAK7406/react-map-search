import React from 'react'
import './stadium.css'
class Stadium extends React.Component{
    handleclick=()=>{
        this.props.handleClick(this.props.stadium)
    };
    render(){
        const title= this.props.stadium.name+ this.props.stadium.capacity;
        const style={
            backgroundImage:"url('"+ this.props.stadium.imageUrl +"')"
        }
        return(
            <div className="stadium" onClick={this.handleclick}>
                <div className="stadium-picture" style={style}></div>
                <div className="stadium-title">
                    {title}
                </div>
            </div>
        );
    }
}
export default Stadium;