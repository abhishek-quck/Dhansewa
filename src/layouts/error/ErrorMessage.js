import React from 'react'

function ErrorMessage({error}) {
    if(error?.length===0)
    {
        return null
    }
    return (
        <div className='text-center'>
            <span className='text-danger'>{error}</span>
        </div>
    )
}

export default ErrorMessage