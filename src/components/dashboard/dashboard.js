import React, { Component } from "react";
import { connect } from "react-redux";
// import Spinner from "../common/spinner/spinner";
import Navbar from "../common/navbar/navbar";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
    this.setState({
      username: this.props.userData.userData.username,
      firstName: this.props.userData.userData.firstName,
      lastName: this.props.userData.userData.lastName
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="dashboard">
            <span className="dashboard__username">
              Welcome {this.state.firstName} {this.state.lastName}
            </span>
            <form onSubmit={this.onSubmit} className="search__form">
              <div className="search__form__group">
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                  className="search__input"
                  placeholder="search product"
                  required
                  autoFocus
                />
              </div>

              <div className="search__btn">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                />
              </div>
              <p className="search__error">{this.state.error}</p>
            </form>
            <div className="dashboard__content" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  {}
)(DashBoard);
