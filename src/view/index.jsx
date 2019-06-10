import React from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // More state data
      email: '',
    password: '',
    formErrors: {email: '', password: ''},
    emailValid: false,
    passwordValid: false,
    formValid: false
    };
  }

  handleUserInput (e) {
  const name= e.target.name;
  const value= e.target.value;
  this.setState({[name]: value});

  }

  submit() {
    
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
      <Container className="Apps">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button className="btn-submit">Submit</Button>
        </Form>
      </Container>
      </header>
    </div>
  );
  }
}


export default Index;
