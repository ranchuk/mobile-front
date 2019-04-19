import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../common/navbar/navbar";
import NavbarHeader from "../common/navbar-header/navbar-header";
import {
  getAllProducts,
  addCart,
  removeCart,
  getCartProducts,
  getUserProducts
} from "../../actions/productsActions";

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      allProducts: [],
      filteredProducts: [],
      searchTermTitle: "",
      searchTermCategory: ""
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
        this.props.getAllProducts();
        this.props.getCartProducts(this.state.username);
        this.props.getUserProducts(this.state.username);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!sessionStorage.getItem("userData")) {
      this.props.history.push("/");
    }

    this.setState({
      allProducts: nextProps.productsData.allProducts,
      filteredProducts: nextProps.productsData.allProducts
    });
  }

  onChange = e => {
    const filteredProducts = this.state.allProducts.filter(product => {
      return (
        product.title.includes(e.target.value.trim()) ||
        product.category.includes(e.target.value)
      );
    });

    this.setState({ filteredProducts, [e.target.name]: e.target.value });
  };

  addCart = productId => {
    const username = this.state.username;
    this.props.addCart({ productId, username });
  };

  removeCart = productId => {
    const username = this.state.username;
    this.props.removeCart({ productId, username });
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

      if (username === this.state.username) return null;

      let isInCart = false;
      if (
        this.props.productsData.cartProducts.filter(
          product => product.productId === productId
        ).length > 0
      ) {
        isInCart = true;
      }

      return (
        <div key={productId} className="card">
          <div className="card__content">
            <span>Title: {title}</span>
            <span>Category: {category}</span>
            <span> Description: {description}</span>
            <span>User name: {username}</span>
            <span>Product ID: {productId}</span>
            <span>Phone number: {phoneNumber}</span>
          </div>
          <div className="card__button">
            {!isInCart ? (
              <input
                productid={productId}
                type="submit"
                value="Add to cart"
                className="btn btn-primary card__button__btn"
                onClick={e =>
                  this.addCart(
                    e.target.attributes.getNamedItem("productId").value
                  )
                }
              />
            ) : (
              <input
                productid={productId}
                type="submit"
                value="Remove from cart"
                className="btn btn-primary btn__remove"
                onClick={e =>
                  this.removeCart(
                    e.target.attributes.getNamedItem("productId").value
                  )
                }
              />
            )}
          </div>
        </div>
      );
    });
    return (
      <div>
        <Navbar />
        <div className="content">
          <div className="dashboard">
            <NavbarHeader />
            <span className="dashboard__username">
              Welcome {this.state.firstName} {this.state.lastName}
            </span>
            <form onSubmit={this.onSubmit} className="dashboard__search__form">
              <input
                className="dashboard__search__form__input"
                name="searchTermTitle"
                type="text"
                value={this.state.searchTermTitle}
                onChange={this.onChange}
                placeholder="search by title"
                autoFocus
              />
              <input
                className="dashboard__search__form__input dashboard__search__form__right"
                name="searchTermCategory"
                type="text"
                value={this.state.searchTermCategory}
                onChange={this.onChange}
                placeholder="search by category"
                autoFocus
              />
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
  { getAllProducts, getCartProducts, getUserProducts, removeCart, addCart }
)(DashBoard);
