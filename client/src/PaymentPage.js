import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentTemplate from './PaymentTemplate';

const PaymentPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [paymentData, setPaymentData] = useState(null);

  // Fetch data based on the id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/payment/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }
        const data = await response.json();
        setPaymentData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!paymentData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <PaymentTemplate value={paymentData}/>
  );
};

export default PaymentPage;
