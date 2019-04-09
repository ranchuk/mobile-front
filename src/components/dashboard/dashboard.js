import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../common/navbar/navbar";
import { getAllProducts } from "../../actions/productsActions";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      allProducts: []
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

    this.props.getAllProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({ allProducts: nextProps.productsData.allProducts });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const products = this.state.allProducts.map(product => {
      const { productId, username, title, category, description } = product;
      return (
        <div className="card">
          <div className="card__content">
            <span>{title}</span>
            <span>{category}</span>
            <span>{description}</span>
            <span>{username}</span>
            <span>{productId}</span>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="dashboard">
            <span className="dashboard__username">
              Welcome {this.state.firstName} {this.state.lastName}
            </span>
            <form onSubmit={this.onSubmit} className="dashboard__search__form">
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
            <div className="dashboard__products">{products}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.userData,
    productsData: state.productsData
  };
};

export default connect(
  mapStateToProps,
  { getAllProducts }
)(DashBoard);
