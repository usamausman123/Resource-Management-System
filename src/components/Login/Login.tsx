import React, { FC } from 'react';
import classes from  './Login.module.css';
import logoImage from './../../assets/i2c_logo.svg'; 
import check from './../../assets/check.svg';
import loginAnimation from './../../assets/login_animation.svg';
import loginWidget from './../../assets/RMS-Login-widgets.png';
import { I2cButton, I2cSwitch, I2cInput } from '@webcomponents/i2cwebcomponents/dist/react';
interface LoginProps {}

const Login: FC<LoginProps> = () => (
    
  <div>
    <div className={classes.wrapper}>
      <div className={classes.mainLeft}>
          <div className={classes.leftContent}>
        <div className={classes.leftContentWrapper}>
          <div className={classes.leftMainImg} id="cleint_login">
                      <div className={classes.leftMainContent}>
                          <img width="550px" src={loginWidget}  />
                          <h1>Manage Your Team Members</h1>
                          <p>We have great tool that make managing your <span>people easy with confidence.</span></p>
                          <ul className={classes.reportListing}>
                              <li>
                                  <img src={check} />
                                  <span>Tracking Attendance</span>
                              </li>
                              <li>
                                  <img src={check} />
                                  <span>Schedule Time</span>
                              </li>
                              <li>
                                  <img src={check} />
                                  <span>Dispute Creation</span>
                              </li>
                          </ul>
                      </div>
            </div>
              </div>
        <div className={classes.leftMainBottom}>
          <p className="text-white"> i2c Inc. © 2022 All Rights Reserved.</p>
        </div>
          </div>
      </div>
      <div className={classes.mainRight}>
          <div className={`${classes.leftMainContent} ${classes.mobileContent}`}>
              <h1>Welcome to the <strong>Online Ticket Reporting System</strong></h1>
          </div>
          <div className={classes.rightContent}>
              <header className={classes.header}>
                  <div className={classes.logo}>
                      <a href="#" aria-label="header_logo" title="i2c Inc.">
                          <img src={logoImage} />
                      </a>
                      <span className={classes.logoText}>Resource Managment System</span>
                  </div>
              </header>
              <div id="Log" className={classes.contentWrapper}>
                  <h2>Log into Your Account</h2>
                  <p>Please enter your User ID and Password to login</p>
                  <div className={classes.loginForm}>
                      <form>
                          <div className={classes.formGroup}>
                              <I2cInput className={classes.inputControl} lineStyled name="userid" id="userid" label="User ID" type="email" placeholder='johndoe@i2cinc.com' required></I2cInput>
                          </div>
                          <div className={`${classes.formGroup} ${classes.passwordGroup}`}>
                              <I2cInput className={classes.inputControl} lineStyled id="password" name="password" label="Password" type="password" placeholder="●●●●●●●●" size="medium" toggle-password required></I2cInput>
                          </div>
                          <div className={classes.formGroup}>
                              <I2cSwitch className={classes['login-switch']}>Remember?</I2cSwitch>
                              <I2cButton className="float-end" variant="primary" size="large" type="submit">SIGN IN</I2cButton>
                          </div>
                      </form>
                  </div>
              </div>
              {/* <footer id="footer">
                  <p>Copyright © i2c Inc. All Rights Reserved.</p>
              </footer> */}
          </div>
          <div className={classes.mobileRes}>
              <ul className={`${classes.reportListing} ${classes.mobileContent}`}>
                  <li>
                      <img src={check} />
                      <span>Report an issue</span>
                  </li>
                  <li>
                      <img src={check} />
                      <span>Log a special request</span>
                  </li>
                  <li>
                      <img src={check} />
                      <span>Check the status of open tickets</span>
                  </li>
              </ul>
              <div className={`${classes.leftMainBottom} ${classes.mobileContent}`}>
                  <p><strong>Note:</strong> This Client Services ticketing system is not designed to act as a secure portal. Information submitted to this system should not contain any unmasked or unencrypted Cardholder Data or Personal Identity Information.</p>
                  <p>Use of this site and product signifies your acceptance of the i2c 
                  <a href="https://www.i2cinc.com/privacy-policy/" className="privacy_link" target="_blank">Privacy Policy.</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
  </div>
);

export default Login;
