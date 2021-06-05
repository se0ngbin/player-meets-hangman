import React, { useEffect, useState } from "react";
import Logo from '../assets/logo.png'
import BellIcon from '../assets/bell_icon.png';
import "./Landing.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import 'bootstrap/dist/css/bootstrap.min.css';

  function Landing() {
    return (

        <div>
        <div className="navbar">
                <img src={Logo} alt="" height="30" className="logo"></img>
            </div>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-3 talk">
                        <h1>Connect</h1>
                        <h1>With</h1>
                        <h1>Others</h1>
                        <br />
                        <h5 className="bold-four">
                        Our app is a revolutionary app that connects individuals looking for a relationship!
                    </h5>
                        <br />
                        <h6><a href = "/createaccount" className="btn btn-dark start start-two">Sign Up</a></h6>
                        <h5> </h5>
                        <h5>Already a user?</h5>
                        <h6><a href = "/login" className="btn btn-dark start start-two">Log In</a></h6>
                    </div>
                    <div className="col-sm-9 showcase-img">
                        {/* <div className="circle"></div> */}
                    </div>
                </div>
            </div>

            <section class="features-icons bg-light text-center det-ails">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Many users</h5>
                                <p class="lead mb-0">Our app has the most users in the dating app industry!</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-layers m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Make or Break Questions</h5>
                                <p class="lead mb-0">So that you don't need to worry about what to chat about!</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-check m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>High dating rate</h5>
                                <p class="lead mb-0">Many of our matched users have gone on to build a long-term relationship.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/*
const Landing = () => {
return (
    <div>
            <div className="navbar">
                <img src={Logo} alt="" height="30" className="logo"></img>
                <Popup
                    trigger={
                        <img src={BellIcon} alt="" height="25" className="bellIcon"></img>
                    }
                    position='bottom right'
                    closeOnDocumentClick
                >
                    
                </Popup>
            </div>
    <section style={sectionStyle}></section>
    
    </div>
    );
}
*/
export default Landing;
    
/* code by Vanessa and Naoya*/

// import React from "react";
// import Logo from '../assets/logo.png'
// import "./Landing.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


//   function Landing() {
//     return (

//         <div>
//         <div className="navbar">
//                 <img src={Logo} alt="" height="30" className="logo"></img>
//             </div>
//             <div className="container content">
//                 <div className="row">
//                     <div className="col-sm-3 talk">
//                         <h1>Connect</h1>
//                         <h1>With</h1>
//                         <h1>Others</h1>
//                         <br />
//                         <h5 className="bold-four">
//                         Our app is a revolutionary app that connects individuals looking for a relationship!
//                     </h5>
//                         <br />
//                         <h6><a href = "/createaccount" className="btn btn-dark start start-two">Sign Up</a></h6>
//                         <h5> </h5>
//                         <h5>Already a user?</h5>
//                         <h6><a href = "/login" className="btn btn-dark start start-two">Log In</a></h6>
//                     </div>
//                     <div className="col-sm-9 showcase-img">
//                         {/* <div className="circle"></div> */}
//                     </div>
//                 </div>
//             </div>

//             <section class="features-icons bg-light text-center det-ails">
//                 <div class="container">
//                     <div class="row">
//                         <div class="col-lg-4">
//                             <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
//                                 <div class="features-icons-icon d-flex  icon-bra-ails">
//                                     <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
//                                 </div>
//                                 <h5>Many users</h5>
//                                 <p class="lead mb-0">Our app has the most users in the dating app industry!</p>
//                             </div>
//                         </div>
//                         <div class="col-lg-4">
//                             <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
//                                 <div class="features-icons-icon d-flex  icon-bra-ails">
//                                     <i class="icon-layers m-auto text-primary icon-ails"></i>
//                                 </div>
//                                 <h5>Make or Break Questions</h5>
//                                 <p class="lead mb-0">So that you don't need to worry about what to chat about!</p>
//                             </div>
//                         </div>
//                         <div class="col-lg-4">
//                             <div class="features-icons-item mx-auto mb-0 mb-lg-3">
//                                 <div class="features-icons-icon d-flex  icon-bra-ails">
//                                     <i class="icon-check m-auto text-primary icon-ails"></i>
//                                 </div>
//                                 <h5>High dating rate</h5>
//                                 <p class="lead mb-0">Many of our matched users have gone on to build a long-term relationship.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default Landing;
