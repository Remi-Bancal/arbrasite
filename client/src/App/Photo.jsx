import React from 'react'
import styled from 'styled-components'


function GalleryComponent(props) {

    const src = "http://localhost:5000/uploads/" + props.filename
    return (
        <>
          <ImageChamp src= { src }
            onClick={() => props.big === 0 && props.setBig(props.img)}
          />
          {props.big === props.img &&
            (<>
                <WideScreen />
                <BigImage src= { src } onClick={() => props.setBig(0)}/>
             </>) 
          }
        </>
    )
}

function MainImage(props) {
    const src = "http://localhost:5000/uploads/" + props.filename
    return ( <Image src= { src }/> )
}

export { GalleryComponent , MainImage }

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
    height: 92%;
    padding: 2%;
    top: 0%;
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
    width:90%;
    padding: 5%;
    background: DarkKhaki;
`