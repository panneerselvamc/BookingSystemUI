import React, { Component } from "react";
import "./RequirementPageCss.css";
import {
  Form,
  Col,
  Row,
  InputGroup
} from "react-bootstrap";
import axios from 'axios';
import Header from "./Header";
import TablePage from './TablePage';
const data = {
  columns: [

    {
      name: 'Paul Byrd',
      position: 'Chief Financial Officer (CFO)',
      office: 'New York',
      age: '64',
      date: '2010/06/09',
      salary: '$725'
    },

  ]
}
export default class RequirementPage extends Component {



  componentDidUpdate() {
    console.log(this.state.source)
    console.log(this.state.destination)
    console.log(this.state.dateOfTravel)
    // console.log(this.state.dateOfBooking)
    console.log(this.state.flightType)
    console.log(this.state.transportClass)
    console.log(this.state.transportType)
  }
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      destination: null,
      dateOfTravel: null,
      flightType: null,
      transportType: null,
      transportClass: null,

      // noOfInfant: null,
      // noOfAdult: null,
      // noOfChildren: null,
      // dateOfBooking: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
    }
  }
  updateSource = (e) => {
    this.setState({
      source: e.target.value
    })
  }
  updateDestination = (e) => {
    this.setState({
      destination: e.target.value
    })
  }
  updateDateOfTravel = (e) => {
    this.setState({
      dateOfTravel: e.target.value
    })
  }
  updateIsDomestic = () => {
    this.setState({
      flightType: "Domestic"

    })
  }
  updateIsInternational = () => {
    this.setState({
      flightType: "International"

    })
  }
  updateIsFirstClass = () => {
    this.setState({
      transportClass: "First Class"

    })
  }
  updateIsEconomyClass = () => {
    this.setState({
      transportClass: "Economy Class"

    })
  }
  updateIsBusinessClass = () => {
    this.setState({
      transportClass: "Business Class"

    })
  }

  handleForm = () => {
    console.log(this.state.source + "     " + this.state.destination)

    const userData = {
      " sourceAddress": this.state.source,
      "destination": this.state.destination,
      "dateOfTravel": this.state.dateOfTravel,
      "transportClass": this.state.transportClass,
      " transportType": this.state.transportType

    };
    const userdata = JSON.stringify({
      "sourceAddress": this.state.source,
      "destination": this.state.destination,
      "dateOfTravel": "",
      " transportClass": "business",
      "transportType": "one-way"
    })
    // const userdata = JSON.stringify({
    //   "sourceAddress": "china",
    //   "destination": "usa",
    //   "dateOfTravel": "",
    //   " transportClass": "business",
    //   "transportType": "one-way"
    // })
    // console.log(userdata)
    axios.post('http://localhost:8880/searchforflight', userdata, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        const person = res;
        console.log(person.data)
      })




    // let age =2;
    //    axios.post(`http://localhost:8880/test`,{age})
    //   .then(res => {
    //     const persons = res.data;
    //     console.log(persons)
    //   })

  }
  // updateNoOfInfant=(e)=>{
  //   this.setState({
  //     noOfInfant:e.target.value,

  //   })
  // }
  // updateNoOfAdult=(e)=>{
  //   this.setState({
  //     noOfAdult:e.target.value,

  //   })
  // }
  // updateNoOfChildren=(e)=>{
  //   this.setState({
  //   noOfChildren:e.target.value,

  //   })
  // }
  render() {


    return (
      <div className="headerBody">
       
        <Header>
          <br />
          <div style={{ paddingRight: "20%", paddingLeft: "20%" }}>
            <br />
            <div className="bodyColor">
              <Form style={{ margin: "2%" }}>
                {/* -------------------------------------- */}

                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>
                      <b>From</b>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="From"
                      onChange={(e) => this.updateSource(e)}
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
                      onChange={(e) => this.updateDestination(e)}
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
                        onChange={(e) => this.updateDateOfTravel(e)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                {/* +++++++++++++++++++++++++++++++++++++++++++++ */}

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
                        onChange={() => this.updateIsDomestic()}
                      />
                      <Form.Check
                        type="radio"
                        label="International "
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange={() =>
                          this.updateIsInternational()
                        }
                      />
                    </Col>
                  </Form.Group>
                </fieldset>

                {/* ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; */}

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



                {/* ___________________________________ */}


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
                        onClick={() => this.updateIsFirstClass()}
                      />
                      <Form.Check
                        type="radio"
                        label="Business Class"
                        name="formClass"
                        id="formClass2"
                        onClick={() => this.updateIsBusinessClass()}
                      />
                      <Form.Check
                        type="radio"
                        label="Economy Class"
                        name="formClass"
                        id="formClass3"
                        onClick={() => this.updateIsEconomyClass()}
                      />
                    </Col>
                  </Form.Group>
                </fieldset>




                {/* ---------------------------------- */}

                {/* <Form.Row>
                  <Form.Group as={Col} md="4" controlId="ageInfant">
                    <Form.Label>
                      <b>Infant</b>
                    </Form.Label>

                    <Form.Control as="select">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>

                    </Form.Group>
                  <Form.Group as={Col} md="4" controlId="ageChildren">
                    <Form.Label>
                      <b>Children</b>
                    </Form.Label>
                    <Form.Control as="select">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                    </Form.Group>
                  <Form.Group as={Col} md="4" controlId="ageAdult">
                    <Form.Label>
                      <b> Adult</b>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control as="select">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </InputGroup>
                  </Form.Group>
                </Form.Row> */}
              </Form>

              <div className="centerStyle">
                <button style={{ backgroundColor: "rgb(60, 179, 113)" }} onClick={() => this.handleForm()}>
                  <b>Search</b> <i class="material-icons">flight</i>
                </button>
              </div>
              <br />
            </div>
          </div>

        </Header>



       {/* <TablePage/> */}

      </div>
    );
  }
}
