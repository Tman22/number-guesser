const React = require('react');

export const ActiveButton = ({handleClick, text, disabled}) => {
  return (
    <button disabled={disabled} onClick={() => handleClick() } >{text}</button>
  );
}

export const RangeInput = ({name, handleRange, value}) => {
  return (
    <input type='number' value={value} onChange={(e)=>handleRange(e)} name={name}/>
  );
}
