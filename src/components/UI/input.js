import React from 'react';
import './UI.css';

const Input = React.forwardRef((props,ref)=>{
    return (
        <div >
        <label htmlFor={props.input.id}>
        {props.label}
        </label>
        <input ref ={ref} {...props.input}/>
        </div>
    );
});

export default Input;