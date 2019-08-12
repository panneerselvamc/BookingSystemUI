import React, { Component } from "react";
import { Button, FormControl, Form, Nav, Navbar ,Carousel} from "react-bootstrap";
import flight1 from '../images/flight1.jpg';
import flight2 from '../images/flight3.jpg';
import Header from './Header';
export default class HomePage extends Component {
    
  render() {
      const footer={
 
      }
    return (
      <Header>
    

        <div  >
          <Carousel >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={flight1}
                height="600px"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={flight2}
                height="600px"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
           
          </Carousel>
        </div>
        </Header>
    );
  }
}
