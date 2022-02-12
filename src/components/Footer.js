import React from 'react'
import { SocialIcon } from 'react-social-icons'
import '../NavFooter.css'

function Footer() {
    return (
        <div className='footer'>
            <small className='mobilesizing'>To learn more about me, visit my GitHub</small>
            <small><SocialIcon className='https://github.com/kbove' rel='noreferrer'/></small>
        </div>
    )
}

export default Footer;