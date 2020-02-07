import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import userIcon from '../../../resources/images/userIcon.svg';
import { getAppVersion } from '../../settings';
import { getCurrentLanguage, getLanguages } from '../../store/languages';
import * as languageActions from '../../store/languages/actions';

const LanguageButton = styled.button`

  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;

  color: #BFBFBF;

  background-color: transparent;

  border: 0 solid white;

  ${props => props.active && css`
    color:  #007079;
`}

`;

const VerticalDivider = styled.div`
  background-color: #E5E5E5;
  width: 2px;
  height: 16px;
  margin-left: 10px;
  margin-right: 10px;
`;

const SetLanguageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 20px;
`;

const Horizontal = styled.span`
  display: flex;
  align-items: center;
`;

class AppHeader extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    fetchLanguages: PropTypes.func.isRequired,
    currentLanguage: PropTypes.object.isRequired,
    setCurrentLanguage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      menuIsOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchLanguages();
  }

  onNavigateHome() {

  }

  toggleMenu() {
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  }

  toggleDropdown(key) {
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  }

  render() {
    const { languages, currentLanguage, setCurrentLanguage } = this.props;
    return (
      <div className="navbar navbar-dark navbar-expand-md app-header">
        {/* <NavLink onClick={() => this.onNavigateHome()} className="link" to={'/'} exact> */}
        {/*  <span className="navbar-brand"> */}
        {/*    <div className="brand"> */}
        {/*      <img className="brand-logo" alt="Equinor" src={brandLogo}/> */}
        {/*    </div> */}
        {/*  </span> */}
        {/* </NavLink> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#header-menu" aria-controls="header-menu" aria-expanded="false">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="header-menu">
          <ul className="navbar-nav mr-auto">
            <li><h1 style={{ fontSize: '18px', marginBottom: '0px', }}>Equinor Ergonomics Admin</h1>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto" style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <li>
              <SetLanguageContainer>
                {languages && languages.map((language, index) =>
                  <Horizontal key={language.name}>
                    <LanguageButton
                      active={language.code === currentLanguage.code}
                      onClick={() => setCurrentLanguage(language)}
                    >{language.name}</LanguageButton>
                    {index < languages.length - 1 && <VerticalDivider/>}
                  </Horizontal>
                )}
              </SetLanguageContainer>
            </li>
            <li className="nav-item dropdown" style={{ verticalAlign: 'middle' }}>
              <a className="nav-link " href="#" id="userDropdown" role="button"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="menu-item">
                  <img className="userIcon" alt="user" src={userIcon}
                       style={{ marginRight: '20px', height: '28px' }}/>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dark">
                <div className="dropdown-header">
                  <div>{this.props.userInfo.userId}</div>
                  <div>version: {getAppVersion()}</div>
                </div>
                <div className="dropdown-divider"/>
                <a tabIndex={0} href="#" className="dropdown-item" role="menuitem"
                   onClick={() => this.props.signOut()}>Sign out</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
  languages: getLanguages(state),
  currentLanguage: getCurrentLanguage(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLanguages: () => dispatch(languageActions.fetchLanguages()),
  setCurrentLanguage: (language) => dispatch(languageActions.setLanguage(language))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));
