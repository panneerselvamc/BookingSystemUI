import React, { Component } from "react";
import { Carousel} from "react-bootstrap";
import flight1 from '../images/flight1.jpg';
import flight2 from '../images/flight3.jpg';
import Header from './Header';
export default class HomePage extends Component {
    
  render() {
     
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
                <h3>Toni Morrison, Song of Solomon</h3>
                <p>
                You wanna fly, you got to give up the shit that weighs you down.
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

              <Carousel.Caption style={{color:"black"}}>
                <h3><b>Kerli</b></h3>
                <p><b>Don't be scared to fly high, 'cause it will inspire others.</b></p>
              </Carousel.Caption>
            </Carousel.Item>
           
          </Carousel>
        </div>
        </Header>
    );
  }
}
