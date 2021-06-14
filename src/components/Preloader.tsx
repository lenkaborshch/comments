import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

const Preloader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '30px 0'}}><CircularProgress/></div>
    )
}

export default Preloader