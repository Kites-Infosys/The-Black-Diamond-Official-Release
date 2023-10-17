import React, { useState } from 'react';
import PageSpinner from '../components/PageSpinner';
import { Redirect, Link } from 'react-router-dom';
import { stateSetter } from '../components/Service';
import {
  Row,
  Col,
  Card,
  Button as ReactStrapButton,
  CardHeader,
  CardBody,
  Table,
  Modal,
  ModalBody,
  ModalFooter, ButtonGroup,
  ModalHeader
} from 'reactstrap';
import Button from 'components/Button';
import Snackbar from "components/Snackbar.js";
import Page from 'components/Page';
import WithdrawlPage from 'pages/WithdrawlPage';
import RechargePage from 'pages/RechargePage';
import {
  MdReportProblem
} from 'react-icons/md';
import StyledTab from "components/StyledTab";
import StyledTabs from "components/StyledTabs";
import TabPanel from "components/TabPanel";





const WalletPage = (props) => {
  console.log(props);
  const [readModal, setReadModal]=useState(false);
  const [errorStatus, setErrorStatus]=useState(false);
  const [errorMessage, setErrorMessage]=useState('');
  const [tab, setTab] = React.useState((props.match.params.param && props.match.params.param=="withdraw") ? 1 : 0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Page 
      className="walletPage"
      title={(
        <div className="header-userinfo"  >
          <img src={`/uploads/avatars/${props.auth.user.avatar ? props.auth.user.id + ".jpg" : "user.png"}`} />
          <div>
            <span className="header-nickname">{props.auth.user.nickname}</span>
            <span className="header-balance" style={{ color: "#fff", fontSize: "16px"}}><small>₹</small>{props.auth.user.budget}.00</span>
          </div>
        </div>
      )}
      breadcrumbs={
        (
          <div className="header-buttons">
            <Button component="a" size="sm" style={{ "float": "right" }}
              color="danger" onClick={()=>setReadModal(true)}>
              Rules
            </Button>
          </div>
        )
      }
    >
    
      <Modal
        isOpen={readModal}
        toggle={()=>setReadModal(!readModal)}>
        <ModalHeader toggle={()=>setReadModal(!readModal)}>Rule</ModalHeader>
        <ModalBody>
           <Row className={'read-rule'} style={{ margin: "0 10px" }}>
                <p style={{ textAlign: 'center' }}><b><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', color: 'white' }}>ABOUT THE GAME:</span></b></p>

                <p style={{ textAlign: 'center' }}><b><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>This Lottery</span></b><span
                    style={{ fontSize: '8.0pt', lineHeight: '115%', }}> is an
                    interesting game that comes up after every 3minutes, and from this
                    3minutes there is 2minutes 30seconds to place your bet on any of the available
                    “4“ Games that we have, and each Game closes after 2minutes 30seconds, then the
next 30seconds is to show the Bet result. </span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>Please note that this <b>Lottery</b> operates a
24hours nonstop Game, meaning that every 3MINUTES new Game comes up which makes
it 20 betting opportunities in ONE HOUR, to a total of 480 Bets in 24HOURS.</span><br />
                  </span><span style={{ fontSize: '8.0pt', lineHeight: '115%' }}></span></p>

                <p style={{ textAlign: 'center' }}><b><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>HOW TO BET:</span></b></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>Example
                  if you spend ₹ 100 to bet, there is always a 2% deduction on every Bet
amount that goes to the referral, the 2% goes to whoever refers you to this <b>Lottery</b>,
so the more you refer people and they are placing bet on this <b>Lottery</b> the
more you making 2% on each bet that your referrals are placing on this <b>Lottery</b>.</span><span
                    style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>Now after deducting the 2% from your ₹ 100
                    , you will be having 98% left, so your bet is based on the 98% of the
                    ₹ 100 which will be ₹ 98. </span><br />
                    <span style={{}}>Now to place bet you can choose from the 4 Games
that we have on our system. </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                  <span style={{}}>(1) <b>Bet on GREEN</b>: click on the Green tab
and a pop up will come up which gives you the opportunity to select your
betting amount of your choice and the number of betting that you feel
comfortable with, so if you decided to place the bet with the above ₹ 98 on a
Single bet number *1* then you only pay ₹ 98, if you increase your Bet number to
Double bet number *2* it means you placing bet with ₹ 196, and if you decided to
place your bet on triple bet number *3* it means you placing bet with ₹ 294. </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>Please
                  note that you have only 2mins 30secs only to place your bet otherwise the bet
                  will close after 2mins 30secs and the result comes up within the next 30
                  seconds which makes it 3mins and another new game start again after every
3mins. </span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <b><span style={{}}>RESULT:</span></b><span style={{}}> </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  here comes the result, after that 2mins 30secs the system will process all bets
                  and display result after the 30 seconds which is displaying under GAME RECORDS,
                  please note that the result is only One Number which is applicable to all the
games on this <b>Lottery</b> system, so the result can be any of these number from <i>0
or 1 or 2 or 3 to 9</i>.</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>so if the result shows any of these FOUR numbers
<u><span style={{ background: '#152428', color: "white" }}>1 or 3 or 7 or 9</span></u>, then you have
won, if the results shows 1 you won, if result shows 3 you won, if the result
shows 7 you won, if the result shows 9 you won, if the result shows any number
that is different from these FOUR mentioned then you loosed the game.</span><br />
                    <b><span style={{}}>YOUR PROFIT:</span></b><span
                      style={{}}> </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  let’s calculate your Profit on the Investment, based on your above ₹ 98
                  if you bet on single then you will get (₹ 98 × 2 = ₹ 196) if you bet on double
                  number which is a total bet of ₹ 296 then it means your profit on the investment
will be (₹ 296 × 2 = ₹ 592)</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>The Winning code number on <b>Bet on GREEN is 2</b>,
so it means you have to multiple your Bet amount by 2 to get your winning
amount, if you place bet with ₹ 500 it means you getting ₹ 1,000 winning.</span><br />
                    <span style={{}}>And if the result shows 5, then your winning
                    code number is 1.5, you will have to calculate your betting amount by 1.5 to
give you your winning amount if the result shows 5. </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                  <span style={{}}>(2) <b>Bet on VIOLET</b>: click on the Violet
tab and a pop up will come up which gives you the opportunity to select your
betting amount of your choice and the number of betting that you feel
comfortable with, so if you decided to place the bet with the above ₹ 98 on a
Single bet number *1* then you only pay ₹ 98, if you increase your Bet number to
Double bet number *2* it means you placing bet with ₹ 196, and if you decided to
place your bet on triple bet number *3* it means you placing bet with ₹ 294.
Please note that you have only 2mins 30secs only to place your bet otherwise
the bet will close after 2mins 30secs and result comes up within the next 30
seconds which makes it 3mins and another new game start again after every
3mins.</span><br />
                  <b><span style={{}}>RESULT:</span></b><span style={{}}> </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  here comes the result, after that 2mins 30 seconds the system will process all
                  bets and display result after the 30 seconds which is displaying under GAME
                  RECORDS, please note that the result is only One Number which is applicable to
                  all the games on this Lottery system, so the result can be any of these number from
<i>0 or 1 or 2 or 3 to 9</i>.</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>so if the result shows any of these TWO numbers <u><span
                      style={{ background: '#152428', color: "white" }}>0 or 5</span></u>, then you have won, if the results
shows 0 you won, if result shows 5 you won, if the result shows any number that
is different from these two mentioned then you loosed the game.</span><br />
                    <b><span style={{}}>YOUR PROFIT:</span></b><span
                      style={{}}> </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  let’s calculate your Profit on the Investment, based on your above ₹ 98
                  if you bet on single then you will get (₹ 98 × 4.5 = ₹ 441) if you bet on double
                  number which is a total bet of ₹ 296 then it means your profit on the investment
will be (₹ 296 × 4.5 = ₹ 882)</span><span style={{ fontSize: '12.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>The Winning code number on <b>Bet on VIOLET</b>
is 4.5, so it means you have to multiple your Bet amount by 4.5 to get your
winning amount, if you place bet with ₹ 500 it means you getting ₹ 2,250 winning.</span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                  <span style={{}}>(3) <b>Bet on RED:</b> click on the Red tab and
a pop up will come up which gives you the opportunity to select your betting
amount of your choice and the number of betting that you feel comfortable with,
so if you decided to place the bet with the above ₹ 98 on a Single bet number
*1* then you only pay ₹ 98, if you increase your Bet number to Double bet number
*2* it means you placing bet with ₹ 196, and if you decided to place your bet on
triple bet number *3* it means you placing bet with ₹ 294. </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>Please
                  note that you have only 2mins 30secs only to place your bet otherwise the bet
                  will close after 2mins 30secs and result comes up within the next 30 seconds which
makes it 3mins and another new game start again after every 3mins.</span><span
                    style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <b><span style={{}}>RESULT:</span></b><span style={{}}> </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  here comes the result, after that 2mins 30 seconds the system will process all
                  bets and display result after the 30 seconds which is displaying under GAME
                  RECORDS, please note that the result is only One Number which is applicable to
                  all the games, so the result can be any of these number from 0 or 1 or 2 or 3
to 9.</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>so if the result shows any of these FOUR numbers
<i><u><span style={{ background: '#152428', color: "white" }}>2 or 4 or 6 or 8</span></u></i>, then you
have won, if the results shows 2 you won, if result shows 4 you won, if the
result shows 6 you won, if the result shows 8 you won, if the result shows any
number that is different from these FOUR mentioned then you loosed the game.</span><br />
                    <b><span style={{}}>YOUR PROFIT</span></b><span style={{}}>: </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  let’s calculate your Profit on the Investment, based on your above ₹ 98
                  if you bet on single then you will get (₹ 98 × 2 = ₹ 196) if you bet on double
                  number which is a total bet of ₹ 296 then it means your profit on the investment
will be (₹ 296 × 2 = ₹ 592)</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>The Winning code number on <b>Bet on RED</b> is
2, so it means you have to multiple your Bet amount by 2 to get your winning
amount, if you place bet with ₹ 500 it means you getting ₹ 1,000 winning.</span><br />
                    <span style={{}}>And if the result shows 0, then your winning
                    code number is 1.5, you will have to calculate your betting amount by 1.5 to
give you your winning amount. </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                  <span style={{}}>(4) <b>Bet on NUMBER</b>: on the dash board you
will see there are number from <i>0 to 9</i>, click on any of the number that
you wish to place bet on, it can be <i>0 or 1 or 2 or 3 or 4 or 5 or 6 or 7 or
8 or 9</i> and a pop up will come up which gives you the opportunity to select
your betting amount of your choice and the number of betting that you feel
comfortable with, so if you decided to place the bet with the above ₹ 98 on a
Single bet number *1* it means you placing bet with ₹ 98, if you increase your
Bet number to Double bet number *2* it means you placing bet with ₹ 196, and if
you decided to place your bet on triple bet number *3* it means you placing bet
with ₹ 294. </span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>Please
                  note that you have only 2mins 30secs only to place your bet otherwise the bet
                  will close after 2mins 30secs and result comes up within the next 30 seconds
which makes it 3mins and another new game start again after every 3mins.</span><span
                    style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <b><span style={{}}>RESULT:</span></b></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  here comes the result, after that 2mins 30 seconds the system will process all
                  bets and display result after the 30 seconds which is displaying under GAME
                  RECORDS, please note that the result is only One Number which is applicable to
all the games, so the result can be any of these number from <i><u>1 or 2 or 3 or
4 or 5 or 6 or 7 or 8 or 9</u></i>.</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>so if the result shows any of those TEN numbers
from <u><span style={{ background: '#152428', color: "white" }}>0 to 9</span></u> and it is same number
you place bet on, then you have won, if the result shows any number that is
different from number you place bet on then you loosed the game.</span><br />
                    <b><span style={{}}>YOUR PROFIT</span></b><span style={{}}>:</span></span></p>

                <p style={{ textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>now
                  let’s calculate your Profit on the Investment, based on your above ₹ 98
                  if you bet on single then you will get (₹ 98 × 9 = ₹ 882) if you bet on double
                  number which is a total bet of ₹ 296 then it means your profit on the investment
will be (₹ 296 × 9 = ₹ 1,764)</span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}><br />
                    <span style={{}}>The Winning code number on <b>Bet on NUMBER is 9</b>,
so it means you have to multiple your Bet amount by 9 to get your winning
amount, if you place bet with ₹ 500 it means you getting ₹ 4,500 winning.</span><br />
                    <br />
                    <b><span style={{}}>HOW TO WITHDRAW YOUR MONEY:</span><br />
                    </b><span style={{}}>In order for you to withdraw your money, you
                    need click on My Profile and Click on Wallet then finally click on Withdrawal.
Please note <b>This Lottery</b> currently support only two withdrawal methods:</span></span></p>

                <p style={{ marginLeft: '.75in', textAlign: 'center', textIndent: '-.5in' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', }}>(1.)<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}>You can withdraw into your <b>BTC wallet</b> and convert into
cash of the currency in your country. </span></p>

                <p style={{ marginLeft: '.75in', textAlign: 'center', textIndent: '-.5in' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', }}>(2.)<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}>You can withdraw into your <b>Paypal account </b>from there
you can move the fund into your bank account directly or into your bank cards.</span></p>

                <p ><span style={{ fontSize: '8.0pt', lineHeight: '115%', }}>&nbsp;</span></p>

                <p style={{ marginLeft: '.25in', textAlign: 'center' }}><span
                  style={{ fontSize: '8.0pt', lineHeight: '115%', }}>Those
                  are the both withdrawal methods that our system currently support, more
withdrawal options coming soon.</span></p>
              </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>setReadModal(!readModal)} >
            Ok
          </Button>
        </ModalFooter>
      </Modal>
        
      <br />
      <StyledTabs variant="fullWidth" value={tab} onChange={handleChange} aria-label="styled tabs example" >
        <StyledTab label="Recharge" style={{color: 'black'}} />
        <StyledTab label="Withdraw" style={{color: 'black'}} />
      </StyledTabs>
      <TabPanel value={tab} index={0}>
        <RechargePage auth={props.auth} style={{color: 'black'}} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <WithdrawlPage auth={props.auth} style={{color: 'black'}} />
      </TabPanel>

      <Snackbar
        place="tr"
        color="success"
        icon={MdReportProblem}
        message={errorMessage}
        open={errorStatus}
        closeNotification={() => setErrorStatus(false)}
        close
      />
    </Page>
  );
}

export default WalletPage;
