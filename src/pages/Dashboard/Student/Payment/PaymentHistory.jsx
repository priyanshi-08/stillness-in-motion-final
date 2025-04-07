import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../../hooks/useAxiosFetch'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';
import { format } from "date-fns"

const PaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItm = payments.length;
  const [page, setPage] = useState(1);
  let itemsPerPage = 5;
  let totalPages = Math.ceil(totalItm / 5);

  const handleChange = (value) => {
    if (value < 1) {
      setPage(totalPages);
    } else if (value > totalPages) {
      setPage(1);
    } else {
      setPage(value);
    }
  }
  
  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const paginated = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(paginated);
  }, [page, payments]);

  useEffect(() => {
    axiosSecure.get(`/payment-history/${currentUser?.email}`).then(res => {
      setPayments(res.data);

      setLoading(false);
    }).catch(err => console.log(err))
  }, [currentUser.email])
  const totalPay = payments.reduce((accum, pay) => accum + (parseFloat(pay.amount) || 0), 0)
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className='relative w-full justify-center my-4'>
      <div className='flex flex-col text-center space-y-2'>
        <h2>Hey <span className='text-2xl text-secondary font-bold'>{currentUser?.name}</span> Welcome...!</h2>
        <h1 className='text-3xl'>My Payemnt History</h1>
        <h3 className='text-gray-400'>You can see all your payment history here</h3>
      </div>
      <div className='my-2'>
        <p>Total Payments: {totalItm}</p>
        <p>Total Paid: ${payments.reduce((accum, pay) => accum + (parseFloat(pay.amount) || 0), 0)}</p>
      </div>
      <div>
        <table className='text-center'>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Total Item</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
              payments ? paginatedPayments.map((pay, idx) => {
                return (<tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{pay.amount}</td>
                  <td>{pay.classesId.length}</td>
                  <td>{format((pay.date), "MMMM dd, yyyy")}</td>
                </tr>)
              }) : <tr>No previous payment available</tr>
            }
          </tbody>
        </table>
        <div className='flex my-2 space-x-2'>
          <button className='text-gray-500 ' onClick={() => handleChange(page-1)}> {'<'} </button>
          <button className='w-6 h-6 text-white bg-red-600 text-xs rounded-full'>{page}</button>
          <button className='text-gray-500' onClick={() => handleChange(page+1)}> {'>'} </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
