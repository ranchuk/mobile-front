import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions/userActions";
import Spinner from "../common/spinner/spinner";
import Navbar from "../common/navbar/navbar";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      error: "",
      success: ""
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
    this.setState({
      username: this.props.userData.userData.username,
      firstName: this.props.userData.userData.firstName,
      lastName: this.props.userData.userData.lastName,
      password: this.props.userData.userData.password,
      phoneNumber: this.props.userData.userData.phoneNumber
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      error: nextProps.userData.errorEdit,
      success: nextProps.userData.successEdit
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };
    // this.props.editUserLoading();
    this.props.editUser(data);
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      return (
        <div>
          <Navbar />

          <div className="content">
            <div className="edituser">
              <div className="edituser__content">
                <div className="edituser__header">
                  <h1>Edit user</h1>
                </div>
                <form onSubmit={this.onSubmit} className="edituser__form">
                  <div className="edituser__form__group">
                    <label className="edituser__form__label">username:</label>
                    <input
                      required={true}
                      type="text"
                      disabled={true}
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                      className="edituser__form__input"
                    />
                  </div>
                  <div className="edituser__form__group">
                    <label className="edituser__form__label" htmlFor="password">
                      password:
                    </label>
                    <input
                      required={true}
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      className="edituser__form__input"
                      id="password"
                    />
                  </div>
                  <div className="edituser__form__group">
                    <label
                      className="edituser__form__label"
                      htmlFor="firstName"
                    >
                      First name:
                    </label>
                    <input
                      required={true}
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      className="edituser__form__input"
                      id="firstName"
                    />
                  </div>

                  <div className="edituser__form__group">
                    <label className="edituser__form__label" htmlFor="lastName">
                      Last name:
                    </label>
                    <input
                      required={true}
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      className="edituser__form__input"
                      id="lastName"
                    />
                  </div>

                  <div className="edituser__form__group">
                    <label
                      className="edituser__form__label"
                      htmlFor="phoneNumber"
                    >
                      Phone Number:
                    </label>
                    <input
                      required={true}
                      type="text"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.onChange}
                      className="edituser__form__input"
                      id="phoneNumber"
                    />
                  </div>

                  <div className="edituser__form__submit">
                    <input
                      type="submit"
                      value="Submit"
                      className="edituser__form__submit-input"
                    />
                  </div>
                  <p>
                    {this.state.error}
                    {this.state.success}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    // loading: state.userData.loading,
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  { editUser }
)(EditUser);
