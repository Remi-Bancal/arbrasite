import React from 'react';
import styled from 'styled-components';


class GalleryComponent extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {filename: this.props.filename, isShown: false};
    }
    handleClick() {this.setState({isShown: !this.state.isShown })}

    render() {
        var src = "http://localhost:5000/uploads/" + this.state.filename;
        return (
        <>
            <ImageChamp src= { src }
            onClick={() =>this.handleClick()}
          />
          {this.state.isShown &&
            (<>
                <WideScreen />
                <BigImage src= { src } onClick={() =>this.handleClick()}/>
             </>)
          }
        </>
        );
      }
}

class MainImage extends React.Component {
    constructor(props){
        super(props);
        this.state = {filename: this.props.filename, isShown: false};
    }

    render() {
        var src = "http://localhost:5000/uploads/" + this.state.filename;
        return ( <Image src= { src }/> );
      }
}


export { GalleryComponent , MainImage }; 

const ImageChamp = styled.img`
    display: flex;
    width: 15%;
    height: 15%;
    float: left;
    margin: 0.5%;
    padding: 1%;
    cursor: pointer;
    border: 1px solid olive;
    background: DarkKhaki;
`
const BigImage = styled.img`
    position:absolute;
    cursor: pointer;
    z-index: 3;
    display: flex;
    height: 100%;
    padding: 2%;
    top: 0;
    left:13%;
    border: 1px solid olive;
    background: DarkKhaki;
`

const WideScreen = styled.div`
    position:absolute;
    z-index:2;
    height:100%;
    width:100%;
    top: 0;
    left: 0;
    background: rgb(0,0,0,0.1);
    backdrop-filter: blur(4px);
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    padding: 5%;
    border-left: 1px solid olive;
    border-top: 2px solid olive;
    background: DarkKhaki;
`