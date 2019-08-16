import React, { Component } from "react";
import "./RequirementPageCss.css";
import {
  Form,
  Col,
  Row,
  InputGroup,
  Modal,
  ButtonToolbar,
  Button
} from "react-bootstrap";
import axios from 'axios';
import Header from "./Header";
import TablePage from './TablePage';

export default class RequirementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      destination: null,
      dateOfTravel: null,
      flightType: null,
      transportType: null,
      transportClass: null,
      isModalVisible: false,
      flightData: [],
    }
  }
  handleForm = () => {
    const userdata = JSON.stringify({
      "sourceAddress": this.state.source,
      "destination": this.state.destination,
      "dateOfTravel": this.state.dateOfTravel,
      " transportClass": this.state.transportClass,
      "transportType": this.state.transportType
    })

    axios.post('http://localhost:8880/searchforflight', userdata, { headers: { 'Content-Type': 'application/json' } })

      .then(res => {
        const person = res;
        this.setState({
          flightData: person.data,
          isModalVisible: true
        })
      })

  }

  render() {


    return (
      <div className="headerBody">

        <Header>
          <br />
          <div style={{ paddingRight: "20%", paddingLeft: "20%" }}>
            <br />
            <div className="bodyColor">
              <Form style={{ margin: "2%" }}>

                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>
                      <b>From</b>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="From"
                      onChange={(e) => this.setState({
                        source: e.target.value
                      })}
                    />


                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>
                      <b>To</b>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="To"
                      onChange={(e) => this.setState({
                        destination: e.target.value
                      })}
                    />

                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>
                      <b> Date of Travel</b>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="Date"
                        placeholder="Date"
                        aria-describedby="inputGroupPrepend"
                        required
                        onChange={(e) => this.setState({
                          dateOfTravel: e.target.value
                        })}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form.Row>



                <fieldset >
                  <Form.Group as={Row}  >
                    <Form.Label as="legend" column sm={2}>
                      <b>Type of Flight</b>
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Domestic "
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onChange={() => this.setState({
                          flightType: "Domestic"

                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="International "
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange={() =>
                          this.setState({
                            flightType: "International"

                          })
                        }
                      />
                    </Col>
                  </Form.Group>
                </fieldset>



                <Form.Group as={Row} controlId="exampleForm.ControlSelect2" >
                  <Form.Label column sm={2}>
                    <b> Transport Type</b>
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control as="select" onChange={(e) => {
                      this.setState({
                        transportType: e.target.value
                      })
                    }}>
                      <option>One Way</option>
                      <option>Multi City</option>
                    </Form.Control>
                  </Col>
                </Form.Group>




                <fieldset>
                  <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                      <b> Class</b>
                    </Form.Label>
                    <Col sm={10} >
                      <Form.Check
                        type="radio"
                        label="First Class"
                        name="formClass"
                        id="formClass1"
                        onClick={() => this.setState({
                          transportClass: "First Class"

                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="Business Class"
                        name="formClass"
                        id="formClass2"
                        onClick={() => this.setState({
                          transportClass: "Business Class"

                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="Economy Class"
                        name="formClass"
                        id="formClass3"
                        onClick={() => this.setState({
                          transportClass: "Economy Class"

                        })}
                      />
                    </Col>
                  </Form.Group>
                </fieldset>





              </Form>

              <div className="centerStyle">
                <button style={{ backgroundColor: "rgb(60, 179, 113)" }} onClick={() => this.handleForm()}>
                  <b>Search</b> <i className="material-icons">flight</i>
                </button>
              </div>
              <br />
            </div>
          </div>

        </Header>

        <Modal show={this.state.isModalVisible} size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered scrollable={true}  >
          <Modal.Header >
            <Modal.Title>Book Your Flight</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <TablePage FlightData={this.state.flightData} />


          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button variant="primary" onClick={() =>
                this.setState({
                  isModalVisible: false
                })
              }>Close</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}
