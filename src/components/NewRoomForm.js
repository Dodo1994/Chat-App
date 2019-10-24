import React, { Component } from 'react'

class NewRoomForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             roomName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({
            roomName: ''
        })
    }

    render() {
        return (
            <form 
            onSubmit= {this.handleSubmit}
            className="new-room-form">
                <input
                onChange={this.handleChange}
                value={this.state.roomName}
                placeholder= "Create a room"
                type= "text"
                required
                />
            </form>
        )
    }
}

export default NewRoomForm
