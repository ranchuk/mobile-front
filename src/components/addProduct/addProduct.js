import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../actions/productsActions";
import Navbar from "../common/navbar/navbar";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      title: "",
      category: "",
      description: "",
      error: "",
      success: ""
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }
    this.setState({
      username: this.props.userData.userData.username
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

  onSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      title: this.state.title,
      category: this.state.category,
      description: this.state.description
    };
    this.props.addProduct(data);
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="content">
          <div className="edituser">
            <div className="edituser__content">
              <div className="edituser__header">
                <h1>Add product</h1>
              </div>
              <form onSubmit={this.onSubmit} className="edituser__form">
                <div className="edituser__form__group">
                  <label className="edituser__form__label" htmlFor="title">
                    Title:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="title"
                  />
                </div>

                <div className="edituser__form__group">
                  <label className="edituser__form__label" htmlFor="category">
                    Category:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="category"
                    value={this.state.category}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="category"
                  />
                </div>

                <div className="edituser__form__group">
                  <label
                    className="edituser__form__label"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    className="edituser__form__input"
                    id="description"
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
const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(
  mapStateToProps,
  { addProduct }
)(AddProduct);
