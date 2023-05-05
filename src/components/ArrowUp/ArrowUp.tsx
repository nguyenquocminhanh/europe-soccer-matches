import React from "react";
import classes from './ArrowUp.module.css';

interface ArrowUpProps {
    onClickHandler: () => void
}

const ArrowUp: React.FC<ArrowUpProps> = props => {
    return (
        <div className={classes.ButtonWrapper}>
            <p>View More</p>
            <button className={classes.ArrowUp} onClick={props.onClickHandler}>
            
            </button>
        </div>
    )   
}

export default ArrowUp;