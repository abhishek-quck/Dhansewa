import React, { useEffect } from 'react'
import $ from 'jquery'

function NotAllowed() {
    useEffect(()=>{
        setTimeout(function(){
            $('div.loading').removeClass('loading');
        }, 0);
    },[])

  return (
    <div className="loading"> 
        <h1> :( </h1>
        <h2 className='mt-5'> Oops! You are not allowed to see this content... &nbsp; </h2>
    </div>
  )
}

export default NotAllowed