import React from 'react';
import styled from 'styled-components';


class ParasiteForm extends React.Component {
    constructor(props){
        super(props);
        this.nameChange = this.nameChange.bind(this);
        this.latinnameChange = this.latinnameChange.bind(this);
        this.rottennessChange = this.rottennessChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {name: '', latinname:'', rottenness:''};
    }

    handleSubmit(event) {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: this.state.name,
                latin_name: this.state.latinname,
                rottenness: this.state.rottenness === "rouge"
             })
        };
        fetch('parasite', requestOptions)
            .then(response => response.json())

        event.preventDefault();
      }

    nameChange(event) {this.setState({ name: event.target.value});}
    latinnameChange(event) {this.setState({ latinname: event.target.value});}
    rottennessChange(event) {this.setState({ rottenness: event.target.value});}

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>Nom vernaculaire: </label>
            <input type="text" value={this.state.name} onChange={this.nameChange} />

            <label> Nom latin : </label>
            <input type="text" value={this.state.latinname} onChange={this.latinnameChange} />
            <label> Pourriture : </label>
            <select id="rottenness" name="rottenness" value={this.state.rottenness} onChange={this.rottennessChange}>
                <option value="rouge">Rouge</option>
                <option value="blanche">Blanche</option>
            </select>
            <input type="submit" value="Envoyer" />
          </form>
        );
      }
}

class ParasiteLists extends React.Component {

    state = {parasiteList: []}

    
    async componentDidMount() {
        const url = "parasites"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({parasiteList: data});
    }

    render() {
        return (
            <div>{this.state.parasiteList.map(parasite => (
            <div>
                <Parasite item={parasite} />
            </div>
            ))}
            </div>
        );  
    }

}

class DeleteButton extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {parasite_id: this.props.parasite_id};
    }

    handleSubmit(event) {
        // Simple DELETE request with a JSON body using fetch
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = 'parasite/' + parseInt(this.state.parasite_id);
        fetch(url, requestOptions)
            .then(response => response.json())

        event.preventDefault();
      }

    render() {
        return (
          <button onClick={this.handleSubmit} type="button" >Delete</button>
        );
      }
}

class Parasite extends React.Component {
    render() {
        return (
            <StyledDiv>
                <ValueDiv>{this.props.item.name}</ValueDiv>
                <ValueDiv>{this.props.item.latin_name}</ValueDiv>
                <ValueDiv>{this.props.item.rottenness ? "Pourriture Rouge" : "Pourriture blanche"}</ValueDiv>
                <DeleteButton parasite_id={this.props.item.id}/>
            </StyledDiv>
        );
    }
}

export { ParasiteLists , ParasiteForm }; 

const StyledDiv = styled.div`
    display: flex;
    background: linear-gradient(darkblue, #9198e5);
    border: 1px solid midnightblue;
    border-radius: 3px;
    padding: 2px 2px 2px 2px;
    margin: 1px 2px 1px 2px;
    color: white;
`

const ValueDiv = styled.div`
    display: flex;
    background: midnightblue;
    margin: 1px 4px 1px 4px;
    padding: 2px 2px 2px 2px;
    border: 1px solid beige;
    border-radius: 1px;
    color: white;
`
