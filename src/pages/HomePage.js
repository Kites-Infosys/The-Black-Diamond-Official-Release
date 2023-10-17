import Page from 'components/Page';
import Button from 'components/Button';
import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import {
    a,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Row
} from 'reactstrap';
import {
  MdReportProblem, MdNotificationsActive
} from 'react-icons/md';
import Snackbar from "components/Snackbar.js";
import { GiLaurelCrown, GiMoneyStack, GiPayMoney, GiTrophy, GiCloudDownload } from "react-icons/gi";
const HomePage = (props) => {
  var [modal, setModal] = useState(false);
  var [listNo, setListNo] = useState(0);
  //carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [list, setList] = useState('');
  const [seniors, setSeniors] = useState([]);
  const [maxBets, setMaxBets] = useState([]);
  const [weeks, setWeeks] = useState(null);
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [review, setReview] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const apkUrl = './pages/blackdiamondapp.apk';
  //products
  const [listVisible, setListVisible] = useState(list);
  const [items, setItems] = useState('');
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const [slides, setSlides] = useState('');
  const postFeedback = async () => {
    if (!JSON.parse(localStorage.getItem('auth'))) {
      setErrorMessage("Please login");
      return;
    }
    const response = await fetch("/api/review", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "Authorization": JSON.parse(localStorage.getItem('auth')).userToken
      },
      body: JSON.stringify({
        feedback: review
      })
    });
    if (response.status == 200) {
      const data = await response.json();
      setSuccessMessage(data.message);
    } else if (response.status == 400) {
      const data = await response.json();
      setErrorMessage(data.message);
    } else if (response.status == 401) {
      const data = await response.json();
      setErrorMessage("Please login");
    } else {
      setErrorMessage("Server error!");
    }

  }
  //products
  useEffect(() => {
    if (list == '' && items == '' && listVisible == '') {
      (async () => {
        const response = await fetch("/json/List", {
          "method": "GET",
          "headers": {
            "content-type": "application/json"
          }
        });
        const data = await response.json();
        await setList(data.items);
        await setListVisible(data.items);
        await setItems(data.carousel);
        setSlides(data.carousel.map((item) => {
          return (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={item.src}
            >
              <img src={item.src} alt={item.altText} style={{ width: "100%" }} />
            </CarouselItem>
          );
        }));
      })();
    }
  }, []);
  //products
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/top-users", {
        "method": "GET",
        "headers": {
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      setSeniors(data.seniors);
      setMaxBets(data.maxBets);
      setReviews(data.reviews);
      setDays(data.days);
      setHours(data.hours);
      setWeeks(data.weeks);
    })();
  }, []);
  return (

    <Page
      className="DashboardPage" style={{ 'background': '#fff' }}>
      
      
       <Row className="next-header" style={{ backgroundColor: "#009688" }}>
        <Col xl={12} lg={12} md={12} style={{ backgroundColor: "#009688" }}>
           <div className='home-title'>
      <h1 style={{ 'fontSize': '50px' }}>Black Diamond</h1>
        <small style={{ 'color': '#fff' }}>Make money everyday with us. <br /> ( The Provably Fair Game. )</small>
      </div>
        </Col>
      </Row>
      
      
      
     
      
      
      {
        slides !== '' && slides.length !== 0 ? (
          <Carousel style={{ 'height': '600px', 'margin': '0 -16px' }}
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        ) : ''
      }
      <div className="section-title">
        <h4><span className='text-warning'><GiCloudDownload style={{ 'color' : '#14a95f' }}  /></span> <small>Download App</small>
          
            
            <a href={apkUrl} className='btn' download="blackdiamondapp.apk" style={{ 'color' : '#14a95f' , 'fontSize' : '15px'}} >CLICK HERE</a>
            </h4>
      </div>
     
     
     
      <br />
      <div className="section-title">
        <h4><span className='text-warning'><GiLaurelCrown  style={{ 'color' : '#14a95f' }} /></span> <small>Senior Forecasters</small></h4>
      </div>

      <ul className="section-list">

        {
          seniors.map((ele, key) => (
            <li className="section-item" key={key}>
              <img src={"/uploads/avatars/" + (ele.avatar ? ele.id + "." + ele.avatar : "user.png")} className="section-avatar" />
              <ul className="section-item-name">
                <li style={{ 'color' : '#23194d' }}>{ele.nickname} <small>(level {ele.level ? ele.level : "1"})</small></li>
                <li className="item-email" style={{ 'color' : '#23194d' }}>{ele.phone}</li>
              </ul>
              <div className="item-content">
                   <span style={{ 'color' : '#23194d' }}>₹ {ele.prize}</span>                  
              </div>
            </li>
          ))
        }
      </ul>
      <br />
      <div className="section-title">
        <h4><span className='text-danger'><GiPayMoney style={{ 'color' : '#14a95f' }} /></span> <small>Top Investors</small></h4>
      </div>
      <ul className="section-list">
        {
          maxBets.map((ele, key) => (
            <li className="section-item" key={key}>
              <img src={"/uploads/avatars/" + (ele.avatar ? ele.id + "." + ele.avatar : "user.png")} className="section-avatar" />
              <ul className="section-item-name">
                <li style={{ 'color' : '#23194d' }}>{ele.nickname} <small>(level {ele.level ? ele.level : "1"})</small></li>
                <li className="item-email" style={{ 'color' : '#23194d' }}>{ele.phone}</li>
              </ul>            
              <div className="item-content">
                  <span style={{ 'color' : '#23194d' }}>₹ {ele.bets}</span>                
              </div>
            </li>
          ))
        }
      </ul>
      <hr />
     
      <Snackbar
        place="tr"
        color="danger"
        icon={MdReportProblem}
        message={errorMessage}
        open={errorMessage != false}
        closeNotification={() => setErrorMessage(false)}
        close
      />
      <Snackbar
        place="tr"
        color="success"
        icon={MdNotificationsActive}
        message={successMessage}
        open={successMessage != false}
        closeNotification={() => setSuccessMessage(false)}
        close
      />

    

    </Page>
  );

};
export default HomePage;