import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../common/navbar/navbar";
import {
  getUserProducts,
  removeMyProduct
} from "../../actions/productsActions";

class MyProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      userProducts: [],
      filteredProducts: [],
      searchTerm: ""
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState(
      {
        username: this.props.userData.userData.username,
        firstName: this.props.userData.userData.firstName,
        lastName: this.props.userData.userData.lastName
      },
      () => {
        this.props.getUserProducts(this.state.username);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      userProducts: nextProps.productsData.userProducts,
      filteredProducts: nextProps.productsData.userProducts
    });
  }

  onChange = e => {
    const filteredProducts = this.state.userProducts.filter(product => {
      return product.title.includes(e.target.value.trim());
      // || product.category.includes(e.target.value)
    });
    this.setState({ filteredProducts, [e.target.name]: e.target.value });
  };

  removeMyProduct = productId => {
    const username = this.state.username;
    this.props.removeMyProduct({ username, productId });
  };

  render() {
    const products = this.state.filteredProducts.map(product => {
      const {
        productId,
        username,
        title,
        category,
        description,
        phoneNumber
      } = product;
      return (
        <div key={productId} className="card">
          <div className="card__content">
            <span>{title}</span>
            <span>{category}</span>
            <span>{description}</span>
            <span>{username}</span>
            <span>{productId}</span>
            <span>{phoneNumber}</span>
          </div>
          <div className="card__button">
            <input
              productid={productId}
              type="submit"
              value="Delete"
              className="btn btn-primary btn__remove"
              onClick={e =>
                this.removeMyProduct(
                  e.target.attributes.getNamedItem("productId").value
                )
              }
            />
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
              <input
                className="dashboard__search__form__input"
                name="searchTerm"
                type="text"
                value={this.state.searchTerm}
                onChange={this.onChange}
                placeholder="search product"
                required
                autoFocus
              />
              <input
                type="submit"
                value="Search"
                className="dashboard__search__form__button"
              />
              <p className="search__error">
                sddddddddddddddddd{this.state.error}
              </p>
              ={" "}
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
  { getUserProducts, removeMyProduct }
)(MyProducts);
