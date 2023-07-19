import React from 'react';
import './Header.css';
import logoImage from './../../assets/i2c_logo.svg';
import ProfileImage from './../../assets/profile.png';
import { Calendar, TickCircle, CloseCircle, DollarCircle, Login, Notification, Setting2, Logout, Profile, User} from 'iconsax-react';
import './Header.css';
import {
  I2cButton,  I2cDivider,
  I2cDropdown,
  I2cMenu,  I2cMenuItem, I2cBadge
} from '@webcomponents/i2cwebcomponents/dist/react';

const Header: React.FC = () => (
  <>
    <header id="secure-header">
        <div className="logo">
            <a href="#" title="i2c Inc.">
                <img src={logoImage} width="39" alt="i2c logo" />
            </a>
            <strong className="logo_text d-md-block d-none">Resource Managment System</strong>
            <strong className="logo_text d-block d-md-none">RMS</strong>
        </div>
        <div className="header-right">
          <div className="checkout-datetime">
            <strong className="title">
              <Calendar className='ico-cal' size="15" color="#242A41"/> 
              <span className="checkout-label"> Check Out:</span>
              <span className="datetime d-block d-md-inline mt-md-0 mt-2"> May 16, 2021 - 06:30 PM</span>
            </strong>
            <I2cButton className='btn-checkin d-md-inline-block d-none' size="x-large" variant="primary">
                <Login className='btn-check-ico' size="20" color="#FFF"/>
                Check In
            </I2cButton>
          </div>
          <div className="notification">
            <I2cDropdown className='notification-dropdown'>
              <I2cButton className='notification-link' slot="trigger">
                <Notification size="20" color="#000"/>
              </I2cButton>
              <I2cMenu className='notification-menu'>
                <I2cMenuItem className='notification-menu-header'>
                  <div className='notification-menu-header-container'>
                    <strong className="title">Notification</strong>
                    <I2cBadge className='notification-badge' variant="primary" size="small">2 New</I2cBadge>
                  </div>
                </I2cMenuItem>
                <I2cMenuItem className='notification-menu-item'>
                  <TickCircle className="notification-dropdown-icon tick" size="40" color="#03C04A" />
                  <div className='notification-details-text'>
                    <strong className="p-name">Unpaid Time off Approved</strong>
                    <span className="emp-id">Sick Leave</span>
                  </div>
                </I2cMenuItem>
                <I2cMenuItem className='notification-menu-item'>
                  <DollarCircle className="notification-dropdown-icon dollar" size="40" color="#46B0E6"/>
                  <div className='notification-details-text'>
                    <strong className="p-name">Flex Hours</strong>
                    <span className="emp-id">Double time for all flex time hours and earn $50 for working all 4 hours.</span>
                  </div>
                </I2cMenuItem>
                <I2cMenuItem className='notification-menu-item'>
                  <CloseCircle className="notification-dropdown-icon close" size="40" color="#F06041"/>
                    <div className='notification-details-text'>
                      <strong className="p-name">Unpaid Time Off Rejected</strong>
                      <span className="emp-id">Monday 01 March (06:00 PM - 07:00 PM)</span>
                    </div>
                </I2cMenuItem>
              </I2cMenu>
            </I2cDropdown>
          </div>
          <div className="profile">
              <I2cDropdown className='profile-dropdown'>
                <I2cButton className='profileimg' slot="trigger">
                  <img src={ProfileImage} alt="profile-photos" width="40" />
                </I2cButton>
                <I2cMenu className='profile-menu'>
                  <I2cMenuItem className='profile-menu-item'>
                    <strong className="p-name">Smith Jhomas</strong>
                    <span className="emp-id">Employee ID: <span> 0022</span></span>
                  </I2cMenuItem>
                  <I2cDivider className='dropdown-divider' />
                  <I2cMenuItem className='profile-menu-item'><User className="profile-dropdown-icon" size="16" color="#666666" />Profile</I2cMenuItem>
                  <I2cMenuItem className='profile-menu-item'><Setting2 className="profile-dropdown-icon" size="16" color="#666666" />Settings</I2cMenuItem>
                  <I2cMenuItem className='profile-menu-item'><Logout className="profile-dropdown-icon" size="16" color="#666666" />Logout</I2cMenuItem>
                </I2cMenu>
              </I2cDropdown>
          </div>
        </div>
    </header> 
    </>
);

export default Header;
