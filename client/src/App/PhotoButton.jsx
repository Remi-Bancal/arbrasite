import React from 'react';
import styled from 'styled-components';

function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  }
  
class PhotoButton extends React.Component {
    componentDidMount(){
      this.fileSelector = buildFileSelector();
    }
    
    handleFileSelect = (e) => {
      e.preventDefault();
      this.fileSelector.click();
    }
    
    render(){
      return <div><StyledA className="button" href="" onClick={this.handleFileSelect}>Select files</StyledA></div>
    }
  }

export { PhotoButton }; 

  const StyledA = styled.a`
    background-color: #4CAF50;
    border: none;
    border-radius: 6px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;`