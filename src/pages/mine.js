import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import {
  Button as ReactStrapButton,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardHeader  

} from 'reactstrap';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  FaBoxOpen,
  FaUserEdit, FaCreditCard
} from 'react-icons/fa';
import { SketchPicker } from 'react-color'
import { GoOrganization, GoShield, GoQuestion, GoSignOut, GoPeople } from "react-icons/go";
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';
import { GiTrophyCup } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ListSubheader from '@mui/material/ListSubheader';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
const MyPage = (props) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [imageCrop, setImageCrop] = useState({
    src: `/uploads/avatars/${props.auth.user.avatar ? props.auth.user.id + ".jpg" : "user.png"}`,
    crop: { unit: 'px', aspect: 1 / 1, width: 200 },
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [isOpen1, setIsOpen1] = useState(false);
  const [nickname, setNickname] = useState({ isOpen: false, name: props.auth.user.nickname });
  const toggle1 = () => setIsOpen1(!isOpen1);
  const handleFileChange = (e) => {
    if (e.target.files[0])
      setImageCrop({
        ...imageCrop,
        src: URL.createObjectURL(e.target.files[0])
      })
  };
  const postNickname = () => {
    // console.log(nickname.name);
    (async () => {
      let base64Image;
      if (image) {
        console.log(image);
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = imageCrop.crop.width;
        canvas.height = imageCrop.crop.height;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(image);
        ctx.drawImage(
          image,
          imageCrop.crop.x * scaleX,
          imageCrop.crop.y * scaleY,
          imageCrop.crop.width * scaleX,
          imageCrop.crop.height * scaleY,
          0,
          0,
          imageCrop.crop.width,
          imageCrop.crop.height
        );

        base64Image = canvas.toDataURL("image/jpeg");
      }
      const data = new FormData();
      data.append("avatar", base64Image);
      data.append('nickname', nickname.name);     


      const response = await fetch("/api/nickname", {
        "method": "POST",
        "headers": {
          "Authorization": props.auth.userToken

        },
        "body": data
      });
      if (response.status == 401)
        props.history.push('/login');
      var auth = JSON.parse(localStorage.getItem('auth'));
      auth.user.nickname = nickname.name;
      auth.user.avatar = "jpg";
      localStorage.setItem('auth', JSON.stringify(auth));
      setNickname({ ...nickname, isOpen: false });
    })();
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
      var tmp = JSON.parse(localStorage.getItem('auth'));
      tmp.user.budget = data.budget;
      localStorage.setItem('auth', JSON.stringify(tmp));

    })();
  }, []);
  return (
    <Page
      className="MyPage AccountPage"
    >
      <Row className="next-header" style={{ backgroundColor: "#009688" }}>
        <Col xl={12} lg={12} md={12} style={{ backgroundColor: "#009688" }}>
          <div className="mt-2" >
            <div className="mr-3" style={{ float: "left", overflow: "hidden", width: "50px", height: "50px", borderRadius: "50px", backgroundColor: "#424242" }}>
              <img src={`/uploads/avatars/${props.auth.user.avatar ? props.auth.user.id + ".jpg" : "user.png"}`} />
            </div>
            <span className="mt-2" style={{ fontWeight: '200' }}>Nickname: {nickname.name}</span>
            <br />
            <span style={{ fontWeight: '200' }}>Referral Code: {props.auth.user.recommendationCode}</span>
             
          </div>
          <div style={{ clear: 'both', padding: "0 12px", fontSize: '1.0rem' }}>Phone: {props.auth.user.phone} &nbsp;&nbsp;&nbsp;
          </div>
          <div style={{ padding: "0 12px", fontSize: '1.0rem' }}>Available Balance: <small>₹</small> {props.auth.user.budget}.00 </div>
          <div style={{ padding: "0 12px" }}>
            <Button color="warning" onClick={() => props.history.push("/wallet")}  >Recharge</Button>&nbsp;
          <Button onClick={() => setNickname({ ...nickname, isOpen: true })} color="danger">Change User Info</Button>
          </div>
        </Col>
      </Row>
      <Row>
        {
          props.auth.user.admin ? (
            <Col xl={12} lg={12} md={12}>
              <>
               <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/users")}>
    <ListItemButton onClick={()=>props.history.push("/users")}>
        <ListItemIcon>
          <PeopleAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Users" />
      </ListItemButton>
    </CardHeader>
   
   
   <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/recharge-admin")}>
    <ListItemButton onClick={()=>props.history.push("/recharge-admin")}>
        <ListItemIcon>
          <AccountBalanceWalletOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Recharge" />
      </ListItemButton>
    </CardHeader>
   
     <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/withdrawl-admin")}>
    <ListItemButton onClick={()=>props.history.push("/withdrawl-admin")}>
        <ListItemIcon>
          <AccountBalanceOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Withdrawal" />
      </ListItemButton>
    </CardHeader>
    
   
   <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/complaint-admin")}>
    <ListItemButton onClick={()=>props.history.push("/complaint-admin")}>
        <ListItemIcon>
          <SupportAgentOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Complaints" />
      </ListItemButton>
    </CardHeader>
    
  
     <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/reward-admin")}>
    <ListItemButton onClick={()=>props.history.push("/reward-admin")}>
        <ListItemIcon>
          <EmojiEventsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Rewards" />
      </ListItemButton>
    </CardHeader>
    
    
     
              
              </>
            </Col>
          ) : ""
        }
      </Row>
       <List
      sx={{ width: '100%',  bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
       
        </ListSubheader>
      }
    >
    <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("#")}>
    <ListItemButton onClick={()=>props.history.push("#")}>
        <ListItemIcon>
          <SendTimeExtensionOutlinedIcon style={{ color: 'red'}}   />
        </ListItemIcon>
        <ListItemText primary="Red Lifafa" />
      </ListItemButton>
    </CardHeader>
   
   
    <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/promotion")}>
    <ListItemButton onClick={()=>props.history.push("/promotion")}>
        <ListItemIcon>
          <MilitaryTechOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Promotion" />
      </ListItemButton>
    </CardHeader>
    
    <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/deposit")} >
    <ListItemButton onClick={()=>props.history.push("/deposit")}>
        <ListItemIcon>
          <AddTaskOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Deposit" />
      </ListItemButton>
      
    </CardHeader>
    
    <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/game-records")}>
      <ListItemButton onClick={()=>props.history.push("/game-records")}>
        <ListItemIcon>
          <ChildFriendlyIcon />
        </ListItemIcon>
        <ListItemText primary="Game Orders" />
      </ListItemButton>
    
    </CardHeader>
      
      
      
      <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/payout")}>
      
      <ListItemButton onClick={()=>props.history.push("/payout")}>
        <ListItemIcon>
          <CreditScoreOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Withdrawal" />
      </ListItemButton>
      
      </CardHeader>
      
      <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/bank/:add?")}>
      
      <ListItemButton onClick={()=>props.history.push("/bank/:add?")}>
        <ListItemIcon>
          <CreditScoreOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Bank Card" />
      </ListItemButton>
      
      </CardHeader>
      
         <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/records/recharge-list")}>
      
      
      <ListItemButton onClick={()=>props.history.push("/records/recharge-list")}>
        <ListItemIcon>
          <ListAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Deposit Redords" />
      </ListItemButton>
      
      </CardHeader>
      
      
         <CardHeader style={{ backgroundColor: 'white', color: 'black'}}  onClick={()=>props.history.push("/records/withdraw-list")}>
       <ListItemButton onClick={()=>props.history.push("/records/withdraw-list")}>
        <ListItemIcon>
          <ListAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Withdrawal Redords" />
      </ListItemButton>
      
      </CardHeader>
         <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/my/policy")}>
       <ListItemButton onClick={()=>props.history.push("/my/policy")}>
        <ListItemIcon>
          <VerifiedUserOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Privacy Policy" />
      </ListItemButton>
      
      
      </CardHeader>
         <CardHeader style={{ backgroundColor: 'white', color: 'black'}} onClick={()=>props.history.push("/aboutUS")}>
     <ListItemButton onClick={()=>props.history.push("/aboutUS")}>
        <ListItemIcon>
          <AnnouncementOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="About Us" />
      </ListItemButton>

      </CardHeader>

      
      
      
    </List>
    
      <Row>
        <Col xl={4} lg={4} md={4} xs={4} className="account-item" onClick={()=>props.history.push("/promotion")}>
          <GoOrganization style={{ color: '#939694'}}  />
          <br />
          <span>Invite Friends</span>
        </Col>
        <Col xl={4} lg={4} md={4} xs={4} className="account-item" onClick={()=>props.history.push("/game-records")}>
          <GiTrophyCup style={{ color: '#939694'}}  />
          <br />
          <span>Game Records</span>
        </Col>
        <Col xl={4} lg={4} md={4} xs={4} className="account-item" onClick={()=>props.history.push("/wallet")}>
          <FaCreditCard style={{ color: '#939694'}}  />
          <br />
          <span>Wallet</span>
        </Col>
      </Row>
      <Row>
        <Col xl={4} lg={4} md={4} xs={4} className="account-item" onClick={()=>props.history.push("/security")}>
          <GoShield style={{ color: '#939694'}}  />
          <br />
          <span>Account Security</span>
        </Col>
        <Col xl={4} lg={4} md={4} xs={4} className="account-item" onClick={()=>props.history.push("/support")}>
          <GoQuestion style={{ color: '#939694'}}  />
          <br />
          <span>Help Center</span>
        </Col>
        <Col xl={4} lg={4} md={4} xs={4} className="account-item" onClick={()=>props.history.push("/logout")}>
          <GoSignOut  style={{ color: '#939694'}}  />
          <br />
          <span>Logout</span>
        </Col>


      </Row>
      <Row>
        <div style={{ "height": '100px' }}></div>
      </Row>
      <Modal
        isOpen={nickname.isOpen}
        toggle={() => setNickname({ ...nickname, isOpen: false })}
      >
        <ModalHeader toggle={() => setNickname({ ...nickname, isOpen: false })}>Change User Info</ModalHeader>
        <ModalBody>
          <Row>
            <div className="image-crop-uploader">
              <ReactCrop
                src={imageCrop.src}
                onImageLoaded={setImage}
                crop={imageCrop.crop}
                onChange={arg => setImageCrop({ ...imageCrop, crop: arg })}
              />
              <br />
              <input type="file" id="file" onChange={handleFileChange} onClick={() => { }} />
              <label htmlFor="file" className="btn-2">Avatar</label>
            </div>
            <Col md={12}>
              <Form>
                <FormGroup>
                  <Input type="text" onChange={(e) => { setNickname({ ...nickname, name: e.target.value }) }} id="exampleSelect1" className='form-control' value={nickname.name} />

                </FormGroup>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={postNickname}>
            Ok
          </Button>
          <Button onClick={() => setNickname({ ...nickname, isOpen: false })}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Page>
  );
};

export default MyPage;