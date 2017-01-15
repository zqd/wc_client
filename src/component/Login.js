/**
 * Created by 19016 on 2017/1/15.
 */
import React from "react";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLogin: false, name: ""};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleLogin(e) {
        if (this.nameInput.value === "") {
            e.preventDefault();
            //TODO 空值验证
        } else {
            //TODO 登陆
            this.props.onLogin(this.nameInput.value);
            this.setState({isLogin: true, name: this.nameInput.value});
        }
    }

    handleLogout() {
        //TODO 登出
        this.props.onLogout();
        this.setState({isLogin: false, name: ""});
    }

    handleOnChange(){
        this.setState({name:this.nameInput.value});
    }

    render() {
        let isLogin = this.state.isLogin
        return (
            <div>
                {
                    isLogin ? (<label>{this.state.name}</label>) : (
                            <input type="text" value={this.state.name} onChange={this.handleOnChange} ref={(input) => this.nameInput = input}/>)
                }
                <button
                    onClick={this.state.isLogin ? this.handleLogout : this.handleLogin}>{this.state.isLogin ? "注销" : "登陆" }</button>
            </div>
        )
    }
}

export default Login
