import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Button.scss"
function Button({value, redirect}) {
    var navigate = useNavigate();
  return (
    <button onClick={()=>{
        navigate(redirect)
    }} class="btn b-level-2 b-type-2">{value}</button>
  )
}

export default Button