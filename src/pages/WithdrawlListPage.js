import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';
import {
  FaRegTired, FaFileUpload, FaHourglassHalf,
  FaArrowCircleLeft, FaRegCheckCircle, FaRegTimesCircle
} from 'react-icons/fa';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Typography from '../components/Typography';
import StyledTab from "components/StyledTab";
import StyledTabs from "components/StyledTabs";
import { Pagination, PaginationItem } from '@material-ui/lab';
import bn from 'utils/bemnames';
const bem = bn.create('page');
const WithdrawlListPage = (props) => {
  const [bonus, setBonus] = useState('');
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);
  const [tab, setTab] = React.useState(5);
  const handleChange = (event, newValue) => {
    setTab(newValue);
    setPage(1);
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/withdrawlList/" + page + "/" + tab, {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "Authorization": JSON.parse(localStorage.getItem('auth')).userToken
        }
      });
      if (response.status == 401)
        props.history.push('/login');
      try {
        if (response.status < 400) {
          const data = await response.json();
          setBonus(data.data);
          setPage(parseInt(data.page));
          setLast(parseInt(data.last_page));
        }

      } catch (err) {

      }

    })();
  }, [page, tab]);
  return (
    <Page title={(<Link to="/wallet/withdraw"><Typography type="h4" className={bem.e('title')}><FaArrowCircleLeft /> Withdrawal List</Typography></Link>)} className="MyPage"  >
      <StyledTabs variant="scrollable" value={tab} onChange={handleChange} aria-label="styled tabs example" scrollButtons="auto">
        <StyledTab label="All" value={5}  style={{ color: "#4a4a4a" }} />
        <StyledTab label="Paid" value={3} style={{ color: "#4a4a4a" }} />
        <StyledTab label="Failed" value={4} style={{ color: "#4a4a4a" }} />
        <StyledTab label="Approved" value={1} style={{ color: "#4a4a4a" }} />
        <StyledTab label="Rejected" value={2} style={{ color: "#4a4a4a" }} />
        <StyledTab label="Waiting" value={0} style={{ color: "#4a4a4a" }} />
      </StyledTabs>
      <br />
      <Row>

        <Col xl={12} lg={12} md={12}>
          {bonus ?
            bonus.map(ele => (
              <div style={{ padding: '0px 0px', border: '0.1px solid #4a4a4a', margin: '0px 0px', fontSize: '0.9rem' }} className='Card' title={ele.status == 0 ? 'Checking...' : (
                ele.status == 1 ? 'Approved, now transfering' : (
                  ele.status == 2 ? 'Declined' : (
                    ele.status == 3 ? 'Success' : 'Error'
                  )
                )
              )} style={{ padding: '0px 0px', border: '0.1px solid #4a4a4a', margin: '0px 0px' }}>
                <span style={{ float: 'left', fontSize: '2rem' }}>
                  {ele.status == 3 ? (<MdAccountBalanceWallet style={{ color: "green" }} />) :
                    (ele.status == 4 ? (<MdAccountBalanceWallet style={{ color: "red" }} />) : (
                      ele.status == 2 ? (<MdAccountBalanceWallet style={{ color: "red" }} />) : (
                        ele.status == 1 ? (<MdAccountBalanceWallet style={{ color: "gold" }} />) : (
                          <FaFileUpload style={{ color: "blue" }} />
                        )
                      )
                    ))}</span>
                <span className='Card' style={{ fontSize: '1.1rem', fontWeight: '400' }}>₹ {ele.money} {' '}
                  {ele.status == 0 ? 'Checking...' : (
                    ele.status == 1 ? 'Approved, now transfering' : (
                      ele.status == 2 ? 'Declined' : (
                        ele.status == 3 ? 'Success' : 'Error'
                      )
                    )
                  )}</span>

                <br />
                <span className='ml-2'>Bank Card</span>
                <span style={{ float: 'right' }}>{ele.createdAt} </span>
              </div>
            )) : ''

          }

        </Col>


      </Row>
      <Row>
        <Pagination color="Success"  count={last}
          page={page} onChange={(e, v) => setPage(v)}
          renderItem={(item) => <PaginationItem component="a" {...item} />} size="small"  />
      </Row>
      <Row>
        <div style={{ "height": '10px' }}></div>
      </Row>
    </Page>
  );
};

export default WithdrawlListPage 