import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';


const MenuBar = styled.div`
  background: white;
  border-bottom: 2px solid #F7F7F7;
  padding-left: 2em;
`;

const MenuBarButton = styled.button`
  color: #666666;

  font-family: Equinor,sans-serif;
  font-weight: 500;
  font-size: 1em;
  line-height: 1.143em;
  background: white;
  padding: 1em 2em;

  border: 0 solid white;

  ${props =>
  props.active &&
  css`
      border-bottom: 2px solid #007079;
      color: #007079;
    `};
`;

class AppMenuBar extends Component {
  render() {
    return (
      <MenuBar>
        <MenuBarButton active>
          Spørsmål
        </MenuBarButton>
        <MenuBarButton>
          Resultat og tiltak
        </MenuBarButton>
      </MenuBar>
    );
  }
}

const mapStateToProps = () => {

};

const mapDispatchToProps = () => {

};

export default connect(mapStateToProps, mapDispatchToProps)(AppMenuBar);

