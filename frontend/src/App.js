import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helper/history';

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            currentUser: undefined,
            showAdminBoard: false,
        };
        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }
    componentDidMount() {
        const user = this.props.user;
        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.is_admin,
            });
        }
    }
    static getDerivedStateFromProps(props, state) {
        const user = props.user;
        if (user) {
            return {
                currentUser: user,
                showAdminBoard: user.is_admin,
            };
        }
        return null;
    }
    logOut() {
        this.props.dispatch(logout());
    }
    render() {
        const { currentUser, showAdminBoard } = this.state;
        return (
            <Router navigator={history}>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Weather APP
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </li>
                            )}
                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link">
                                        User
                                    </Link>
                                </li>
                            )}
                        </div>
                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <>
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                </div>
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            Register
                                        </Link>
                                    </li>
                                </div>
                            </>
                        )}
                    </nav>
                    <div className="container mt-3">
                        <Routes>
                            <Route exact path="/" element={<Home/>} />
                            <Route exact path="/home" element={<Home/>} />
                            <Route exact path="/login" element={<Login/>} />
                            <Route exact path="/register" element={<Register/>} />
                            <Route path="/user" element={<BoardUser/>} />
                            <Route path="/admin" element={<BoardAdmin/>} />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}


export default connect(mapStateToProps)(App);