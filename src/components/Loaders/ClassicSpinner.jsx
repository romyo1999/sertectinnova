import React from 'react'

const ClassicSpinner = ({className}) => {
  return (
<div class={`dot-spinner ${className}`}>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>
  )
}

export default ClassicSpinner
