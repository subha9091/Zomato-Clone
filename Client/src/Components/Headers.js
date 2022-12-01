import React from "react";
import '../Style/Filter.css';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        window.open("http://localhost:8000/auth/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:8000/auth/google", "_self");
    };

    github = () => {
        window.open("http://localhost:8000/auth/github", "_self");
    };

    render() {
        const { loginModalIsOpen, loggedInUser, isLoggedIn } = this.state;
        const { user } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-danger">
                    <div className="container-fluid">
                        <div className="logo_filter">
                            <b>e!</b>
                        </div>
                        {!user ? (
                            <form className="d-flex">
                                <a className="nav-link active text-white" aria-current="page"
                                    onClick={() => this.handleModal('loginModalIsOpen', true)} >login</a>

                                <button className="btn btn-danger border-white" type="button" onClick={() => this.handleModal('loginModalIsOpen', true)} >Create an account</button>
                            </form>) : (
                            <form className="d-flex ">
                                <img src={user.photos[0].value} alt="" className="avatar" />
                                <a className="nav-link " aria-current="page" style={{ color: 'white', justifyContent: "flex-end" }}>&nbsp; {user.displayName}</a>&emsp;
                                <button className="btn btn-danger border-white" type="button" onClick={this.handleLogout}>Logout</button>
                            </form>)}
                    </div>
                </nav>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles} >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', marginBottom: '10px', marginTop: '-30px' }} onClick={() => this.handleModal('loginModalIsOpen', false)}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>

                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px', marginTop: '-20px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <div className="login" style={{ color: '#CE0505', textAlign: 'center', marginRight: '-20px', marginTop: '20px' }}>
                            <h3>login</h3>
                        </div>
                        <div className="loginButton google" onClick={this.google}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" height={"40px"} width={"40px"} alt="" className="icon" />
                            &nbsp; <span>Google</span>
                        </div>

                        <div className="loginButton github" onClick={this.github}>
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" height={"40px"} width={"40px"} alt="" className="icon" />
                            &nbsp; Github
                        </div>

                    </div>
                </Modal>
            </div>
        )
    }
}
export default Header;

