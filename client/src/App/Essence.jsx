import React from 'react';
import styled from 'styled-components';


class EssenceForm extends React.Component {
    constructor(props){
        super(props);
        this.nameChange = this.nameChange.bind(this);
        this.latinnameChange = this.latinnameChange.bind(this);
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
             })
        };
        fetch('tree_essence', requestOptions)
            .then(response => response.json())

        event.preventDefault();
      }

    nameChange(event) {this.setState({ name: event.target.value});}
    latinnameChange(event) {this.setState({ latinname: event.target.value});}

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>Nom vernaculaire: </label>
            <input type="text" value={this.state.name} onChange={this.nameChange} />

            <label> Nom latin : </label>
            <input type="text" value={this.state.latinname} onChange={this.latinnameChange} />

            <input type="submit" value="Envoyer" />
          </form>
        );
      }
}

class EssenceList extends React.Component {

    state = {essenceList: []}

    
    async componentDidMount() {
        const url = "tree_essences"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({essenceList: data});
    }

    render() {
        return (
            <div>{this.state.essenceList.map(essence => (
            <div>
                <Essence item={essence} />
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
        this.state = {essence_id: this.props.essence_id};
    }

    handleSubmit(event) {
        // Simple DELETE request with a JSON body using fetch
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const url = 'tree_essence/' + parseInt(this.state.essence_id);
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

class Essence extends React.Component {
    render() {
        return (
            <StyledDiv>
                <ValueDiv>{this.props.item.name}</ValueDiv>
                <ValueDiv>{this.props.item.latin_name}</ValueDiv>
                <DeleteButton essence_id={this.props.item.id}/>
            </StyledDiv>
        );
    }
}

export { EssenceList , EssenceForm }; 

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
