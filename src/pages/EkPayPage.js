import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

function EkPayPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transactions', { mobileNumber, transactionId, amount });
      alert('Transaction submitted successfully!');
      setMobileNumber('');
      setTransactionId('');
      setAmount('');
    } catch (error) {
      console.error(error);
      alert('Failed to submit transaction.');
    }
  };
const [/* ... */, selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);


 const handlePayment = () => {
    if (selectedPaymentMethod === 'UPI') {
      const upiUrl = `upi://pay?pa=payee@upi&pn=PayeeName&mc=123&tid=12345&url=https://theblackdiamonds.in/callback`;
    // Implement payment logic for the selected payment method
      
      // Open the UPI app with the deep link
      window.location.href = upiUrl;
    } else {
      // Handle other payment methods
    }
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <CardHeader className="text-center">
              <h1>EkPay</h1>
              <p>UPI ID: Mehbubtech@ybl</p>
              <CopyToClipboard text="Mehbubtech@ybl" onCopy={() => setCopied(true)}>
                <Button color="primary">{copied ? 'Copied!' : 'Copy UPI ID'}</Button>
              </CopyToClipboard>
            </CardHeader>
            <CardHeader>
             <div className="mt-4">
                <h4>Select Payment Method:</h4>
                <Button color="success" onClick={() => handlePayment('Paytm')} className="mr-2">Paytm</Button>
                <Button color="info" onClick={() => handlePayment('PhonePe')} className="mr-2">PhonePe</Button>
                <Button color="warning" onClick={() => handlePayment('Google Pay')} className="mr-2">Google Pay</Button>
                <Button color="danger" onClick={() => handlePayment('Mobikwik')}>Mobikwik</Button>
                <div>
      {/* ... */}
      <Button color="info" onClick={() => setSelectedPaymentMethod('UPI')} className="mr-2">UPI</Button>
      {/* ... */}
      <Button color="primary" onClick={handlePayment}>Proceed to Payment</Button>
    </div>
              </div>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="mobileNumber">Mobile Number:</Label>
                  <Input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="transactionId">Transaction ID:</Label>
                  <Input type="text" id="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Amount:</Label>
                  <Input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EkPayPage;