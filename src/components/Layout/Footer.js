import React from 'react';
import { NavLink } from 'react-router-dom';
import {   NavLink as BSNavLink,Navbar, Nav, NavItem } from 'reactstrap';
import { SwatchesPicker } from 'react-color';
import {
  FaHome,
  FaCoins,
 FaTrophy,
 FaUser
} from 'react-icons/fa';

import HomeIcon from '@mui/icons-material/Home';

import CircumIcon from "@klarr-agency/circum-icons-react";
import DiamondIcon from '@mui/icons-material/Diamond';

import { RiHomeHeartLine } from "react-icons/ri";

import { FaAmazonPay } from "react-icons/fa";

import { GiCrystalShine, GiLaurelCrown } from "react-icons/gi";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {
  GiCardPlay,GiWallet,GiCrownCoin
} from 'react-icons/gi';
import {
  HiSupport
} from 'react-icons/hi';
import {
  AiOutlineLogin
} from 'react-icons/ai';
import bn from 'utils/bemnames';
const bem = bn.create('footer');

const Footer = () => {
  var navItems;
  if(localStorage.getItem('auth')){
    navItems = [
   
       { to: '/', name: 'Home', exact: true, Icon: HomeIcon   },
     //{ to: '/raffle', name: 'Raffle', exact: true, Icon: GiCrystalShine  },
      { to: '/play', name: 'WinGO', exact: true, Icon: DiamondIcon  },

      { to: '/wallet', name: 'Wallet', exact: true, Icon: GiWallet  },
      { to: '/mine', name: 'Account', exact: false, Icon: AccountCircleOutlinedIcon  },
      // { to: '/about', name: 'About', exact: false, Icon: MdContactMail }
    
    ];
  }else{
    navItems = [
   
      { to: '/', name: 'Home', exact: true, Icon: HomeIcon  },
      // { to: '/admin', name: 'Admin', exact: false, Icon: FaUserEdit },
      { to: '/login', name: 'Signin', exact: false, Icon: AiOutlineLogin },
      // { to: '/about', name: 'About', exact: false, Icon: MdContactMail }
    
    ];
  }
  return (
    <Navbar className="footer" style={{background: "#03867a"}}>
      <Nav navbar>
        {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')} style={{color: "white"}}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-normal"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                  style={{color: "white"}}
                >
                  <Icon className={bem.e('nav-item-icon')}  style={{color: "white", fontSize: "23px"}} />
                  <span className="" style={{color: "white", fontSize: "13px"}}>{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
      </Nav>
    </Navbar>
  );
};

export default Footer;
