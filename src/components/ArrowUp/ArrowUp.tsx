import React from "react";
import classes from './ArrowUp.module.css';

interface ArrowUpProps {
    onClickHandler: () => void
}

const ArrowUp: React.FC<ArrowUpProps> = props => {
    return (
        <button className={classes.ArrowUp} onClick={props.onClickHandler}>
            
        </button>
    )   
}

export default ArrowUp;