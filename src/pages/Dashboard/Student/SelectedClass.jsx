import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ClimbingBoxLoader } from 'react-spinners';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const SelectedClass = () => {
    const { currentUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const role = currentUser?.role;

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`)
            .then((res) => {
                setSelectedClass(res.data);
                setLoading(false)
            })
            .catch(err => console.log(err));
        setLoading(false);
    }, [])

    const total = selectedClass.reduce((a, b) => {
        return a + (Number(b.price) || 0);
    }, 0)
    const taxTotal = total * 0.1;
    let extraFee = 0;
    if (total > 1000) {
        extraFee = extraFee + (total * 0.5);
    }
    const finalTotal = (total + taxTotal + extraFee).toFixed(2);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            axiosSecure.delete(`/delete-cart-item/${id}`).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        icon: "success"
                    });
                }
                const newClasses = selectedClass.filter((cls) => cls._id !== id);
                setSelectedClass(newClasses);
            }).catch(err => console.log(err))

        });
    }

    const handlePay = (id) => {
        const item = selectedClass.find(cls => cls._id === id);
        const price = item.price;
        navigate('/dashboard/user/payment', { state: {price: price, itemId:id } })
        // axiosSecure('/create-payment-intent').then(res => {
        //     nagivate('')
        // }).catch(err => console.log(err));
    } 



    return (
        <>
            <div className='relative w-full justify-center'>
                <h1 className='text-3xl text-center font-bold mt-6'>My <span className='text-secondary'> Selected</span> Class</h1>
                <h2 className='text-lg font-bold my-4 ml-6'>My Cart</h2>
                <div className='flex mx-auto px-2 py-4'>
                    {/* left container */}
                    <div className='w-[70%] shadow-md h-[200px] mr-2'>
                        <div className='p-4'>
                            <table className='w-full p-2 border-collapse text-sm'>
                                <thead>
                                    <tr className='p-2'>
                                        <th className='text-left p-2 semi-bold border'>#</th>
                                        <th className='text-left p-2 semi-bold border'>Product</th>
                                        <th className='text-left p-2 semi-bold border'>Price</th>
                                        <th className='text-left p-2 semi-bold border'>Date</th>
                                        <th className='text-left p-2 semi-bold border'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedClass.length === 0 ? <tr className='text-center font-bold border text-2xl'>No Classes Available</tr> :
                                            selectedClass.map((item, idx) => {
                                                return <tr key={idx}>
                                                    <td className='p-2 border'>{idx + 1}</td>
                                                    <td className='p-2 border'>
                                                        <div className='flex w-full'>
                                                            <img src={item.image} alt={item.name} className='w-10 h-10' />
                                                            <span className='p-2 text-sm'>{item.class_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className='p-2 border'>${item.price}</td>
                                                    <td className='p-2 border'>{item.date}</td>
                                                    <td className='p-2 border'>
                                                        <div className='flex items-center justify-center'>
                                                            <button onClick={() => handleDelete(item._id)} className='rounded-lg bg-red-500 p-1.5 m-2 text-white'><MdDelete /></button>
                                                            <button onClick={() => handlePay(item._id)} className='rounded-lg bg-green-500 p-1 text-white m-2'>$ Pay</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='w-[30%] shadow-md h-[200px] text-sm'>
                        <p className='font-bold m-4'>Summary</p>
                        <div className='mx-4 my-2'>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Subtotal</p>
                                <p >${total}</p></div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Taxes</p>
                                <p>${taxTotal.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Extra Fee</p>
                                <p className=''>${extraFee}</p>
                            </div>
                            <div className='w-50 h-0.5 bg-gray-300 my-2'> </div>
                            <div className='flex justify-between'>
                                <p className='bold-md'>Total</p>
                                <p className='bold-md'>${finalTotal}</p>
                            </div>
                            <button disabled={finalTotal < 0 } onClick={ () => {navigate("/dashboard/user/payment", { state: { price: finalTotal, id:"null" } }) } } className='rounded-lg bg-pink-300 w-full text-white p-1 m-2'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectedClass;
