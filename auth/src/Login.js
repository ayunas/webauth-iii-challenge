import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  input = e => {
    e.preventDefault();
    console.log("%c input has been triggered", "font-size:18; color:red;");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.login({
            username: this.state.username,
            password: this.state.password
          });
        }}
      >
        <input
          name="username"
          value={this.state.username}
          onChange={this.input}
          placeholder="username"
        />
        <br />
        <input
          name="password"
          value={this.state.password}
          onChange={this.input}
          placeholder="password"
        />
        <br />
        <button>Login</button>
      </form>
    );
  }
}

export default Login;
