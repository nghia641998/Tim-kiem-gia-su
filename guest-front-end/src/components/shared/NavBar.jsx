import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {openAuthenticationModal} from "../../modals/Authentication/AuthenticationAction";
import {logOut} from "../../actions/user";
import History from "../../history";

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      path: window.location.pathname,
      visible: window.location.pathname !== '/'
    }

    History.listen(location => {
      this.setState({path: location.pathname});
      if(location.pathname === '/'){
        this.setState({visible: false});
      }
    });
  }

  componentDidMount(){
    const {path} = this.state;
    const handleScroll = () => {
      if(path !== '/')
        return this.setState({visible: true});
  
      const currentScrollPos = window.pageYOffset;
      const _visible = currentScrollPos > document.querySelector('#header').offsetHeight;
  
      this.setState({visible: _visible});
    };

    window.addEventListener("scroll", handleScroll);
  }

  items = {
    NotLogin: [
      { text: "Trở thành gia sử", isHightLight: true, data:'signup' },
      { text: "Đăng nhập", data:'login'  },
      { text: "Đăng kí", data:'signup' }
    ],
    LoginAsStudent: [
      { text: "Hợp đồng học", isHightLight: true, link: "/contact" },
      { text: "Doanh thu", link: "/salary" },
      { text: "Tin nhắn", link: "/message" }
    ],
    LoginAsTeacher: [
      { text: "Yêu cầu dạy học", isHightLight: true, link: "/contact" },
      { text: "Hợp đồng học", link: "/contact" },
      { text: "Doanh thu", link: "/salary" },
      { text: "Tin nhắn", link: "/message" }
    ],
  };

  imgError(image) {
    image.target.src = "/images/avatar.png";
  }


  onLogout = () => {
    this.props.logOut();
  }

  renderElement = () => {
    const { isSignedIn,user, openAuthenticationModal } = this.props;

    if (isSignedIn) {
      return (
        <ul className='navbar-nav ml-auto'>
          {this.items["LoginAsTeacher"].map((item, index) => {
            return (
              <li className='nav-item' key={item.text + index}>
                <Link className='nav-link' to={item.link}>
                  <span className={item.isHightLight ? 'hightlight' : ''}>
                    {item.text}
                  </span>
                </Link>
              </li>
            )
          })}
          <li className='nav-item'>
            <div className="dropdown avatar" data-toggle='dropdown'>
              <img src={user.avatar} onError={this.imgError} alt="" />
            </div>
            <div className='dropdown-menu'>
              <div className="user-info">
                <img src={user.avatar} onError={this.imgError} alt="avatar"/>
                <p>{user.username}</p>
              </div>
              <button
                className='dropdown-item'
                type='button'
              >
              <i class="fas fa-cog"/>
                Cài đặt
              </button>
              <button onClick={this.onLogout}
                className='dropdown-item'
                type='button'
              >
              <i class="fas fa-sign-out-alt"></i>
                Đăng xuất
              </button>
            </div>
          </li>
        </ul>
      )
    }

    return (
      <ul className='navbar-nav ml-auto'>
        {this.items["NotLogin"].map((item, index) => {
          return (
            <li className='nav-item' key={item.text + index}>

              <div
                href="/"
                className={`nav-link ${item.isHightLight ? 'hightlight' : ''}`}
                onClick={() => openAuthenticationModal(item.data)}
              >
                {item.text}
              </div>
            </li>
          )
        })}
      </ul>
    )
  };

  render() {
    const {visible} = this.state;
    return (
      <nav className={`navbar navbar-expand-lg bg-white ${  visible?'visible navbar-light': 'non-visible navbar-dark'}`} id="header">
        <Link to='/'>
          <div className='header--logo'>
            <img src="/images/logo-gia-su.png" alt="logo" />
          </div>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {this.renderElement()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    openAuthenticationModal,
    logOut
  }
)(NavBar);
