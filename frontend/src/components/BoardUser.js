import React, { Component } from "react";
import UserService from "../services/user.service";

export default class BoardUser extends Component {
    ws = new WebSocket('ws://localhost:3000/ws')
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
    }
    componentDidMount() {
        this.ws.onopen = (event) => {
            console.log("Connected to server");
        };
        this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({content: message})
            console.log(message)
        }
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                content:
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString()
                });
            }
        );
    }
    callWeatherAPI(e) {
        // const city = e.target.value
        // const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=154f51e5405eaedd34e7ef47b1b33387`
        // fetch(url)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     this.ws.send(JSON.stringify(data))
        // })
    }
    render() {
        return (
        <div className="container">
            <header className="jumbotron">
            </header>
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <input type="text" className="form-control" onChange={this.callWeatherAPI} placeholder="Search" />
                </div>
            </section>
        </div>
        );
    }
}