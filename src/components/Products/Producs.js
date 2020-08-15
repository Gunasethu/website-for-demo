import React from "react";
import { Link } from 'react-router-dom';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import has from "lodash/has";
import map from "lodash/map";
import includes from "lodash/includes";
import BaseComponent from '../BaseComponent';
import Gallery from "../ProductPage/Gallery";
import "./custom.css";

function Modal3D(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="3d-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body className="p-0">
        <div style={{maxHeight: '600px'}}>
          <button className="btn-link close" style={{position: 'absolute',zIndex: 9,right: '5px',margin: '5px',color: '#FFF'}} onClick={props.onHide}>
            Close
          </button>
          <div style={{left: "0px", width: "100%", height: "0px", position: "relative", paddingBottom: "75%", overflow: "hidden",}}>
              <iframe src="./3d/02/index.html"
                  title="3d product"
                  style={{ position: "absolute", top: "0px", left: "0px", height: "100%", minWidth: "100%", width: "100%", }}
                  allowFullScreen
                  frameBorder="0"
                  scrolling="no">
              </iframe>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default class Products extends BaseComponent {
  constructor(props) {
    super();
    this.state.modal = false;
    this.state.current = '';
    this.state._3d = [
      {
        img : require('./img/Product-Page-03a-Pure.png'),
        file: '02',
      },
      {
        img : require('./img/Product-Page-03b-Lamp.png'),
        file: '02'
      },
    
    ];
    this.imageType = ['back_ground', 'product', 'another', 'top','followup'];
  }

  /**
   * Get background imagee
   * 
   * @param object images 
   */
  getImage(images, type){
    let image = images[0].photo;
    for (let i = 0; i < images.length; i++) {
      if(has(images[i], 'image_type') && (includes(this.imageType, images[i].image_type.toLowerCase()))){
        if(images[i].image_type.toLowerCase() === type){
          image = images[i].photo;
          break;
        }
      }
    }

    return image;
  }

  productDetail(product){
    return (
      <div className="main-container">

        <div className="home-bg-1 ml-3 mr-3" style={{backgroundImage: 'url('+this.getImage(product.allimages, 'top')+')'}}>
          <p>HIGHER LIVING</p>
        </div>
        
        <div className="home-bg-prod" style={{backgroundImage: 'url('+this.getImage(product.allimages, 'back_ground')+')'}}>
          <div className="home-bg-2_text">
            <h5 className="text-uppercase border-teal"> {product.name}</h5>
            <br />
            <small dangerouslySetInnerHTML={{ __html: 'Inspired from ancient traditions developed by great scholars of the past, H.H.M brings you Panacea Ultimate for Rousing Energy (P.U.R.E), a smoke therapy that will make you feel alive from within. Cosmic energy strikes the earth from all directions. The process of P.U.R.E helps to attract, absorb, and direct cosmic energy to travel towards the brain and energize the seven chakras in the body. P.U.R.E package contains the PANACEA ULTIMATE powder which is a mixture of 43 different herbs with tremendous health benefits. This smoke therapy has created many people to live their life with utmost potential and the well being of a holistic lifestyle. The theories that are set out to a benefit that humans could gain are set out by HHM so that people can live the complete while they achieve a perfect goal-oriented life to make a difference in the nature and in the lifestyle.  It can be smoked at any time in your living room/any part of your house regardless of religion anyone can use the P.U.R.E to elevate their life.'}} /><br />
            <Link className="mt-3 btn btn-primaryhome" to={"/item/"+product.slug}>Buy now</Link>
          </div>
        </div>


        <div className="pproduct">
          <img src={this.getImage(product.allimages, 'followup')} className="img-fluid w-100" alt="..." />
        </div>

        <div className="home-bg-1" style={{backgroundImage: 'url('+this.getImage(product.allimages, 'another')+')'}}>
          <Container>
            <Row className="_3d">
              <Col md="5">
              <img src={require('./img/3D-button.png')} alt="3d" title="3D VIEW" className="img-fluid _3d-button" onClick={() => this.setState({modal: true})}/>

              <Gallery img={this.state._3d[0].img} gallery={map(this.state._3d, 'img')} _3d={this.state._3d}/>

              <Modal3D
                show={this.state.modal}
                onHide={() => this.setState({modal: false})}
                current={this.state.current}
              />
              </Col>
              
              <Col md="7">
                <div className="home-bg-2_text">
                  <div dangerouslySetInnerHTML={{ __html:'<b>BENEFITS OF P.U.R.E SMOKE THERAPY</b><br/>Breaks addictions<br/>Energizes the chakras<br/>Improves focus<br/>Enhances memory<br/>Purifies air<br/>Heals respiratory disorders<br/>Eliminates free radicals<br/>Has anti-inflammatory and antioxidant effects<br/>Absorbs cosmic energy' }} /><br />
                  <Link className="mt-3 btn btn-primary" to={"/item/"+product.slug}>Buy now</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        
      </div>
    );
  }

  content() {
    //
    return(
      <>
        {
          this.pageContent.prods.data.map((product, key) =>
            (<div key={key}>
              {this.productDetail(product)}
            </div>)
          )
        }
      </>
    )
  }

  render(){
    return (!this.state.pageLoaded)?this.prePage():this.content();
  }
}