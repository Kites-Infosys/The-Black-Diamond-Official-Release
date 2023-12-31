import Page from 'components/Page';
import React, { useState, useEffect, useRef } from 'react';
import {
  Col, InputGroup, InputGroupAddon, Input, FormGroup, Label,
  Row
} from 'reactstrap';
import {
  MdReportProblem
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import Typography from '../components/Typography';
import PageSpinner from '../components/PageSpinner';
import Button from 'components/Button';
import { SketchPicker } from 'react-color'
import Snackbar from "components/Snackbar.js";
import bn from 'utils/bemnames';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
const bem = bn.create('page');
const RechargePage = (props) => {
  const razorpay_div = useRef(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState(props.auth.user.email);
  const [budget, setBudget] = useState(props.auth.user.budget);
  const [money, setMoney] = useState('');
  const [account, setAccount] = useState('');
  const [accountItems, setAccountItems] = useState('');
  const apply = async () => {
    if (money == '') {
      setErrorMessage("Please input the amount to recharge.");
      return;
    }
    // if (email == '') {
    //   setErrorMessage("Please input your email address.");
    //   return;
    // }
    if (money < 300) {
      setErrorMessage("More than ₹ 300 allowed.");
      return;
    }
    const response = await fetch("/api/recharge", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "Authorization": props.auth.userToken

      },
      body: JSON.stringify({ money })
    });
    const data = await response.json();
    if (response.status == 200) {
      const pd = {
        orderId: data.orderId,
        mid: data.mid,
        txnToken: data.txnToken      
      };
      try {
        var f = document.createElement("form");
        f.setAttribute('method', "post");
        f.setAttribute('action', `https://theblackdiamonds.in/#/ekpay`);
        const sortedkeys = Object.keys(pd);
        for (var k = 0; k < sortedkeys.length; k++) {
          var i = document.createElement("input"); //input element, text
          i.setAttribute('type', "hidden");
          i.setAttribute('name', sortedkeys[k]);
          i.setAttribute('value', pd[sortedkeys[k]]);
          f.appendChild(i);

        }
        document.getElementsByTagName('body')[0].appendChild(f);
        f.submit();
      } catch (err) {
        console.log(err);
      }
    }
    else
      setErrorMessage(data.error);
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/budget", {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "Authorization": props.auth.userToken

        }
      });
      if (response.status == 401)
        props.history.push('/login');
      const data = await response.json();
      var tmp = props.auth;
      tmp.user.budget = data.budget;
      localStorage.setItem('auth', JSON.stringify(tmp));
      setBudget(data.budget);
      const response1 = await fetch("/static/account.json", {
        "method": "GET",
        "headers": {
          "content-type": "application/json"
        }
      });
      const data1 = await response1.json();
      setAccount(data1);
      setAccountItems(Object.getOwnPropertyNames(data1));
    })();
  }, []);
  return (
      

<>
      <Row>
         
        <Col xl={12} lg={12} md={12} style={{padding:"0 30px"}}>
                 
        </Col> 
        <Col xl={12} lg={12} md={12}>
          <InputGroup>
            <InputGroupAddon addonType="prepend"><span className="input-group-text">₹</span></InputGroupAddon>
            <Input value={money} type="number" max='15000' min='0' placeholder="Enter Recharge amount" onChange={(e) => { setMoney(e.target.value) }} />
          </InputGroup>
        </Col>
        <Col xl={12} lg={12} md={12} className="amount-button">
          <Button component="a"  className={'ml-3 mr-3 mt-2'} onClick={() => setMoney(300)}  style={{ width: '80px',height: '40px', backgroundColor: '#d9e3f0', color:'#000', fontSize: '15px'}}  >₹ 300</Button>
          <Button component="a" color="light" className={'ml-3 mr-3 mt-2'} onClick={() => setMoney(1000)}  style={{ width: '80px',height: '40px', backgroundColor: '#d9e3f0', color:'#000', fontSize: '15px'}} >₹ 1000</Button>
          <Button component="a" color="light" className={'ml-3 mr-3 mt-2'} onClick={() => setMoney(2000)}  style={{ width: '80px',height: '40px', backgroundColor: '#d9e3f0', color:'#000', fontSize: '15px'}} >₹ 2000</Button>
          <Button component="a" color="light" className={'ml-3 mr-3 mt-2'} onClick={() => setMoney(5000)}  style={{ width: '80px',height: '40px', backgroundColor: '#d9e3f0', color:'#000', fontSize: '15px'}} >₹ 5000</Button>
          <Button component="a" color="light" className={'ml-3 mr-3 mt-2'} onClick={() => setMoney(10000)}  style={{ width: '80px',height: '40px', backgroundColor: '#d9e3f0', color:'#000', fontSize: '15px'}} >₹ 10000</Button>
          <Button component="a" color="light" className={'ml-3 mr-3 mt-2'} onClick={() => setMoney(15000)}   style={{ width: '80px',height: '40px', backgroundColor: '#d9e3f0', color:'#000', fontSize: '15px'}} >₹ 15000</Button>
        </Col>

        <Col md={12} style={{ textAlign: 'center' }} className={'mt-3'} >
          {!isLoading ? (
            <Button onClick={apply} size="sm" color="warning" block> Recharge </Button>
          ) : (
            <PageSpinner />
          )}

        </Col>
        <Col md={12} style={{ textAlign: 'center' }} >
          <Button to="/records/recharge-list" component={Link} color="danger" simple> Recharge Records</Button>
        </Col>
        <Col md={12} style={{ textAlign: 'center' }} >
            <div ref={razorpay_div}></div>
        </Col>
        <Snackbar
          place="tr"
          color="danger"
          icon={MdReportProblem}
          message={errorMessage}
          open={errorMessage}
          closeNotification={() => setErrorMessage(false)}
          close
        />
      </Row>
      <Row>
        <div style={{ "height": '100px' }}></div>
      </Row>
    </>
  );
};

export default RechargePage
