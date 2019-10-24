import React from 'react'

function TextMessage (props) {
    return (
        <div className="message">
            <div className="message-username">
                {props.username}
            </div>
            <div className="message-text">
                {props.text}
            </div>
        </div>
    )
}

export default TextMessage
