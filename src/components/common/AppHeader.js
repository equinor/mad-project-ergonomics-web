import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import brandLogo from '../../../resources/images/countryInformationIcon.png';
import userIcon from '../../../resources/images/userIcon.png';
import textSizeIcon from '../../../resources/images/textSizeIcon.png';
import { getAppVersion } from '../../settings';

class AppHeader extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      menuIsOpen: false,
    };
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
    return (
      <div className="navbar navbar-dark navbar-expand-md app-header">
        <NavLink onClick={() => this.onNavigateHome()} className="link" to={'/'} exact>
          <span className="navbar-brand">
            <div className="brand">
              <img className="brand-logo" alt="Equinor" src={brandLogo} />
            </div>
          </span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#header-menu" aria-controls="header-menu" aria-expanded="false">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="header-menu">
          <ul className="navbar-nav mr-auto">
            <li><h1 style={{ fontSize: '18px', marginBottom: '0px' }}>Application Name</h1></li>
          </ul>
          <ul className="navbar-nav ml-auto" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <li style={{ verticalAlign: 'middle' }}>
              <span className="menu-item">
                <img className="textSizeIcon" alt="textSizeIcon" src={textSizeIcon} style={{ marginTop: '5px' }} />
              </span>
            </li>
            <li className="nav-item dropdown" style={{ verticalAlign: 'middle' }}>
              <a className="nav-link " href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="menu-item">
                  <img className="userIcon" alt="user" src={userIcon} style={{ marginRight: '20px', marginTop: '0px' }} />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dark">
                <div className="dropdown-header">
                  <div>{this.props.userInfo.userId}</div>
                  <div>version: {getAppVersion()}</div>
                </div>
                <div className="dropdown-divider" />
                <a tabIndex={0} href="#" className="dropdown-item" role="menuitem" onClick={() => this.props.signOut()}>Sign out</a>
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
});

const mapDispatchToProps = () => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));
