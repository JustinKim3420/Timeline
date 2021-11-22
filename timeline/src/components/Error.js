import React from 'react'

const Error =({error})=>{
    return(<div className='error-page'>
        <h1>{error} ERROR</h1>
        {error===404
        ? <div id='error-message'>Could not find username, please search for a different user</div>
        : <div id='error-message'>Could not get data for user, please search at a later time</div>}
    </div>)
}

export default Error