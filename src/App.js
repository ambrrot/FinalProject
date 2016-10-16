import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Panel
} from 'react-bootstrap';


class App extends Component {



    state = {
        name: "",
        lname: "",
        posi: "",
        plays: [],
        trophy: "",
        comment: "",
        records:[]
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


    saveSurvey = ()=> {

        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="warning" onClick={this.deleteItem(item.id)}>Delete</Button></td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.lname}</td>
                     <td>{item.posi}</td>
                     <td>{
                         item.plays.map((play, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{play}</span>
                                 </div>
                         })

                      }
                     </td>
                     
                     <td>{item.trophy}</td>
                     <td>{item.comment}</td>
                </tr>
            );
        });


        return (
            <div className="container">
                <div className="page-header">
                    <h2>Basket Ball School Try Out</h2>
                </div>
               
                    <Grid>
                        
                                <Form><div>
                                 <div className="jumbotron">
                                    <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Youre First Name Here..."
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                        <HelpBlock>This is your First Name</HelpBlock>
                                    </FormGroup>
                                       </div>     
                                    <div className="jumbotron"> 

                                    <FormGroup>
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Youre Last Name Here..."
                                            value={this.state.lname}
                                            onChange={this.onChange('lname')}
                                            />
                                        <HelpBlock>This is your Last Name</HelpBlock>
                                    </FormGroup>
                                 </div>
 <div className="jumbotron">
                                 
                                    <FormGroup>
                                        <ControlLabel>Position</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Put your position here..."
                                                     value={this.state.posi}
                                                     onChange={this.onChange('posi')}
                                            >
                                            <option value="POINT GUARD">POINT GUARD</option>
                                            <option value="CENTER">CENTER</option>
                                            <option value="FORWARD">FORWARD</option>
                                            <option value="POWER FORWARD">POWER FORWARD</option>
                                            <option value="SHOOTING GUARD">SHOOTING GUARD</option>
                                        </FormControl>
                                        <HelpBlock>Your applied position</HelpBlock>
                                    </FormGroup>
                            </div>    
                             
                                   <div className="jumbotron">
                                    <FormGroup >
                                        <ControlLabel>Favorite Play</ControlLabel>
                                        <Checkbox value="ISOLATION"
                                                  checked={this.state.plays.indexOf('ISOLATION')>=0 ? true:false}
                                                  onChange={this.checkboxChange('plays')}>
                                           ISOLATION
                                        </Checkbox>
                                        <Checkbox value="MAN to MAN"
                                                  checked={this.state.plays.indexOf('MAN to MAN')>=0 ? true:false}
                                                  onChange={this.checkboxChange('plays')}>
                                            MAN to MAN
                                        </Checkbox>
                                        <Checkbox value="PICK and ROLL"
                                                  checked={this.state.plays.indexOf('PICK and ROLL')>=0 ? true:false}
                                                  onChange={this.checkboxChange('plays')}>
                                            PICK and ROLL
                                        </Checkbox>
                                    </FormGroup>
                            </div>
 <div className="jumbotron">
                                    
                                    <FormGroup>
                                        <ControlLabel>Number of Trophy you get</ControlLabel>
                                        <Radio name="trophy" value="1"
                                               onChange={this.onChange('trophy')}>1</Radio>
                                        <Radio name="trophy" value="2"
                                               onChange={this.onChange('trophy')}>2</Radio>
                                        <Radio name="trophy" value="3"
                                               onChange={this.onChange('trophy')}>3</Radio>
                                        <Radio name="trophy" value="4"
                                               onChange={this.onChange('trophy')}>4</Radio>
                                         <Radio name="trophy" value="5"
                                               onChange={this.onChange('trophy')}>5</Radio>             
                                    </FormGroup>
                           </div>
                                  <div className="jumbotron">  
                                
                                    <FormGroup>
                                        <ControlLabel>Comments</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="Feel free to express . . ."
                                            value={this.state.comment}
                                            onChange={this.onChange('comment')}
                                            cols="70"
                                            rows="7"      
                                            />
                                    </FormGroup>
                                    </div>
                                    </div>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>SEND</Button>

                                    </ButtonGroup>
                                </Form>
                           <br/><br/>
<div className="jumbotron1">
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Position</th>
                                        <th>Fav. Play</th>
                                        <th>Trophy</th>
                                        <th>Comment</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                                
                            </div>
                    </Grid>

                </div>
      
        );
    }
}

export default App;
