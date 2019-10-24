import React from 'react'

const Hello =(props) => {
    console.log(props)
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Hello ',
            props.name,
            ' A.K.A ',
            props.heroName),
            props.children)
}

export default Hello