import React from "react";
import { Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import has from "lodash/has";
import BaseComponent from '../BaseComponent';
import Gallery from './Gallery';
import "./custom.css";

class ProductPage extends BaseComponent {
  constructor(props) {
    super();

    this.state.qty = 1;
    this.state.availability = '';
    this.buy = this.buy.bind(this);
    this.toCart = this.toCart.bind(this);
    this.qtyClick = this.qtyClick.bind(this);
  }

  /**
   * Cart added and checkout
   * 
   * @param {object} e 
   */
  buy(e){
    this.addCart(this.pageContent, this.state.qty);
    return this.redirect('checkout');
  }

  /**
   * Cart added and checkout
   * 
   * @param {object} e 
   */
  toCart(e){
    console.log(e);
  }
  
  /**
   * Change quantity
   * 
   * @param {object} e
   */
  qtyClick(e){
    if(has(e.target.dataset, 'qty')){
      if(e.target.dataset.qty === "1"){
        this.setState({
          qty: ++this.state.qty
        })
      }else if(this.state.qty > 1){
        this.setState({
          qty: --this.state.qty
        })
      }
    }
  }

  buyButtom(){
    if(this.state.isLoggedIn){
      if(this.pageContent.stock <= 0){
        return(<span className="text-danger">Out of stock</span>);
      }

      return(
          <InputGroup className="buy">
            {/* <InputGroup.Prepend onClick={this.qtyClick}>
              <InputGroup.Text data-qty="0" className="btn">-</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="text-center" aria-label="Quantity" value={this.state.qty} readOnly />
            <InputGroup.Append onClick={this.qtyClick}>
              <InputGroup.Text data-qty="1" className="btn">+</InputGroup.Text>
            </InputGroup.Append> */}
            <InputGroup.Append>
            <Button className="btn btn-primary rounded" onClick={this.buy}>Buy now</Button>
            </InputGroup.Append>
            <small className="d-block w-100 my-2">Secure transaction</small>

            <input type="number" className="border pl-2 d-block w-100" name="availability" placeholder="Enter pincode"/>
            <span>{this.state.availability}</span>
          </InputGroup>
      );
    }
    return(<Link className="mt-3 btn btn-primary" to={"/login?item/"+this.pageContent.slug}>Login & buy</Link>);
  }

  content() {
    console.log(this.pageContent);
    return(
      <div className="main-container py-4">

        <Container fluid>
          <h5 className="text-uppercase border-teal"> {this.pageContent.name} </h5>
          <Row className="no-gutters">
            <Col md="6" sm="auto" className="">
              <strong className="text-uppercase">Gallery</strong>
              <Gallery img={this.pageContent.photo} gallery={this.pageContent.gallery.split(',')} />
            </Col>

            <Col md="1"></Col>

            <Col md="5" sm="auto">
              <strong className="text-uppercase">Product summary</strong>
              <div className="border-teal-top px-2">
                <b className="text-uppercase border-teal"> {this.pageContent.name} </b>
          
                <p>Total weight: {this.pageContent.size_qty + this.pageContent.size}</p>
                
                <hr />

                <div>
                  <small>One year pack</small><br/>
                  <p>Qty:<span data-qty="0" onClick={this.qtyClick} className="btn">-</span><span className="px-2 py-1 border">{this.state.qty}</span><span data-qty="1" onClick={this.qtyClick}className="btn">+</span></p>
                  <b>Total amount: RS.{this.pageContent.price}</b> /- <cite>(Inclusive of all tax)</cite><br/>
                  <small>Free shipping inside india</small>
                </div>
                
                <hr/>

                {this.buyButtom()}

                <hr/>

                <div>
                  {this.pageContent.stock > 0?<span className="text-success">In stock</span>:<span className="text-danger">Out of stock</span>}
                  <br/>
                  <small>{this.pageContent.youtube}</small>
                  <br/>
                  <small>{this.pageContent.policy}</small>
                  <div dangerouslySetInnerHTML={{ __html: this.pageContent.details }} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>

      </div >
    )
  }

  render(){
    return (!this.state.pageLoaded)?this.prePage():this.content();
  }
}

export default ProductPage;