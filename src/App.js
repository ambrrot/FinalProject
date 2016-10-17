import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
     Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Panel,Modal
} from 'react-bootstrap';
class App extends Component {
    constructor(){
        super()
    }
    state = {
       name: "",
        lname: "",
        posi: "",
        plays: [],
        trophy: "",
        comment: "",
        
        show: false,
       selectedName: "",
        selectedLname: "",
        selectedPosi: "",
        selectedPlays: [],
        selectedTrophy: "",
        selectedComment: "",
        selectedId: "",
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
    modalonChange = (fieldName)=> {
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
    modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);
            var state = this.state.selectedPlays;
            state[fieldName] = targetArray;
            this.setState(state.selectedPlays);
        }
    };
    saveSurvey = ()=> {
       
        var data = {name:this.state.name,
                    lname:this.state.lname,
                    posi:this.state.posi,
                    plays:this.state.plays,
                    trophy:this.state.trophy,
                    comment:this.state.comment};
         console.log(data);
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
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {
                });
        };
    };
    
    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                         name: data.name,
                 lname:data.lname,
                 comment:data.comment,
                 posi: data.posi
                    })
                }).catch((error)=>{
                    
                });
        };
    };
    openModal = (id)=>{
            return ()=>{
                this.setState({
                    show: true
                })
                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                         selectedName: data.name,
                        selectedLname: data.lname,
                        selectedPosi: data.posi,
                        selectedPlays: data.plays,
                        selectedTrophy: data.trophy,
                        selectedComment: data.comment,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });
            };
        };
    
    saveEdit = (id) =>{
        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                        lname: this.state.selectedLname,
                        posi: this.state.selectedPosi,
                        trophy: this.state.selectedTrophy,
                        plays: this.state.selectedPlays,
                        comment:this.state.selectedComment};
            delete data.records;
            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {
                });
            this.setState({
                show: false,
                selectedComment: "",
                selectedTrophy: "",
                selectedPlays: [] ,
                selectedPosi: "",
                selectedLname: "",
                selectedName : "",
            });
        }
    };
    render() {
        var rows  = this.state.records.map((item,i)=>{
            return (
                <tr key={i}>
                     <td><Button  bsStyle="warning" onClick={this.deleteItem(item.id)}>Delete</Button></td>
                     <td><Button  bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button></td>
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
        
        let close = () => this.setState({show: false})
        return (
            <div className="container">
                <h1> {this.state.suway} </h1>
                <div className="page-header">
                    <font><strong>Basket Ball School Try Out</strong></font>
                </div>
                <div><center><p>Please Fillup bellow and don't forget to leave your comment</p></center></div>
                <div className="jumbotron">
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
                                            placeholder="Your Comment here..."
                                            value={this.state.comment}
                                            onChange={this.onChange('comment')}
                                            cols="70"
                                            rows="7"      
                                            />
                                    </FormGroup>
                                    </div>
                                    </div><br/>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>SEND</Button>

                                    </ButtonGroup>
                                </Form>
                           <br/><br/>
<div className="jumbotron1">
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                    
                                    
                                        <th>Delete</th>
                                        <th>Edit</th>
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
                 <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Page</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                                <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Youre First Name Here..."
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />
                                 
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Last Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Youre Last Name Here..."
                                            value={this.state.selectedLname}
                                            onChange={this.modalonChange('selectedLname')}
                                            />
                          
                                    </FormGroup>

                                               <FormGroup>
                                        <ControlLabel>Position</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Put your position here..."
                                                     value={this.state.selectedPosi}
                                                     onChange={this.modalonChange('selectedPosi')}
                                            >
                                            <option value="POINT GUARD">POINT GUARD</option>
                                            <option value="CENTER">CENTER</option>
                                            <option value="FORWARD">FORWARD</option>
                                            <option value="POWER FORWARD">POWER FORWARD</option>
                                            <option value="SHOOTING GUARD">SHOOTING GUARD</option>
                                        </FormControl>
                                        
                                    </FormGroup>


                                               <FormGroup >
                                        <ControlLabel>Favorite Play</ControlLabel>
                                        <Checkbox value="ISOLATION"
                                                  checked={this.state.selectedPlays.indexOf('ISOLATION')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedPlays')}>
                                           ISOLATION
                                        </Checkbox>
                                        <Checkbox value="MAN to MAN"
                                                  checked={this.state.selectedPlays.indexOf('MAN to MAN')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedPlays')}>
                                            MAN to MAN
                                        </Checkbox>
                                        <Checkbox value="PICK and ROLL"
                                                  checked={this.state.selectedPlays.indexOf('PICK and ROLL')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedPlays')}>
                                            PICK and ROLL
                                        </Checkbox>
                                    </FormGroup>


                                                 <FormGroup>
                                        <ControlLabel>Number of Trophy you get</ControlLabel>
                                        <Radio name="selectedTrophy" value="1"
                                               onChange={this.modalonChange('selectedTrophy')}>1</Radio>
                                        <Radio name="selectedTrophy" value="2"
                                               onChange={this.modalonChange('selectedTrophy')}>2</Radio>
                                        <Radio name="selectedTrophy" value="3"
                                               onChange={this.modalonChange('selectedTrophy')}>3</Radio>
                                        <Radio name="selectedTrophy" value="4"
                                               onChange={this.modalonChange('selectedTrophy')}>4</Radio>
                                         <Radio name="selectedTrophy" value="5"
                                               onChange={this.modalonChange('selectedTrophy')}>5</Radio>             
                                    </FormGroup>

                                     <FormGroup>
                                        <ControlLabel>Comments</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="Feel free to express . . ."
                                            value={this.state.selectedComment}
                                            onChange={this.modalonChange('selectedComment')}
                                            cols="55"
                                            rows="7"      
                                            />
                                    </FormGroup>
                                                <ButtonGroup>
                                                    <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save Survey</Button>
                                                </ButtonGroup>
                                            </Form>
                            </Modal.Body>
                        </Modal>
                        </div>
            </div>
        );
    }
}
export default App;