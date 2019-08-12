import React, { Component } from 'react'
import {
    Button,
    FormControl,
    Form,
    Nav,
    Navbar,
    Carousel
  } from "react-bootstrap";
export default class Header extends Component {
    render() {
        return (
            <div>
      <div>
        <Navbar bg="dark" variant="dark">
          <b style={{ color: "white" }}>Fight Booking System</b>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/bookaflight">Book a Flight</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button
              variant="outline-info"
              onClick={() => {
                alert("Hai");
              }}
            >
              Search
            </Button>
          </Form>
        </Navbar>
      </div>
      
   

      {this.props.children}
    </div>
        )
    }
}
