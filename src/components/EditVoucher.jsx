import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const EditVoucher = ({ voucherId }) => {
    const navigate = useNavigate()
    const idGet = localStorage.getItem('usersId')
    let storedVoucherIds = localStorage.getItem('editVoucherId');
    const { state } = useAuth();

    const [formData, setFormData] = useState({
        voucherId: storedVoucherIds,
        cheque_no: '',
        cheque_date: '',
        currency: '',
        exchange_rate: '',
        payRecieveTo: '',
        userId: idGet,
        voucherItems: [
            {
                id: '',
                account: '',
                type: '',
                amount: '',
                account1: '',
                type1: '',
                amount1: '',
                narration: '',
                narration1: '',

            },
        ],
    });
    const currencyOptions = ['USD', 'PKR', 'EUR', 'GBP'];

    useEffect(() => {
        // Retrieve the voucherId from localStorage
        const storedVoucherId = localStorage.getItem('editVoucherId');

        // Check if voucherId is available
        if (!storedVoucherId) {
            console.error('VoucherId is undefined.');
            return;
        }

        const fetchVoucherDetails = async () => {
            try {
                const response = await axios.post(`https://backend-auth-x6d3.onrender.com/api/voucher/getsinglevoucher/${storedVoucherId}`);
                const voucherData = response.data;
                console.log('voucerh,', voucherData)
                // Update state with the fetched data
                setFormData({
                    voucherId: storedVoucherId,
                    cheque_no: voucherData.data.cheque_no,
                    cheque_date: voucherData.data.cheque_date,
                    currency: voucherData.data.currency,
                    exchange_rate: voucherData.data.exchange_rate,
                    payRecieveTo: voucherData.data.payRecieveTo,
                    userId: idGet,
                    voucherItems: [
                        {
                            id: voucherData.data.VoucherItem.id,
                            account: voucherData.data.VoucherItem.account,
                            type: voucherData.data.VoucherItem.type,
                            amount: voucherData.data.VoucherItem.amount,
                            account1: voucherData.data.VoucherItem.account1,
                            type1: voucherData.data.VoucherItem.type1,
                            amount1: voucherData.data.VoucherItem.amount1,
                            narration: voucherData.data.VoucherItem.narration,
                            narration1: voucherData.data.VoucherItem.narration1,

                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching voucher details:', error.data);
            }
        };

        fetchVoucherDetails();
    }, []); // Empty dependency array to run the effect only once on mount
    console.log(formData);
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create the request data from the form data
        const requestData = {
            voucherId: storedVoucherIds,
            cheque_no: Number(formData.cheque_no),
            cheque_date: formData.cheque_date,
            currency: formData.currency,
            exchange_rate: formData.exchange_rate,
            payRecieveTo: formData.payRecieveTo,
            userId: idGet,
            voucherItems: [
                {
                    id: formData.voucherItems[0].id,
                    account: formData.voucherItems[0].account,
                    type: formData.voucherItems[0].type,
                    amount: formData.voucherItems[0].amount,
                    account1: formData.voucherItems[0].account1,
                    type1: formData.voucherItems[0].type1,
                    amount1: formData.voucherItems[0].amount1,
                    narration: formData.voucherItems[0].narration,
                    narration1: formData.voucherItems[0].narration1,

                },
            ],
        };

        try {
            // Send the updated data to the backend for editing
            const response = await axios.put(`/api/voucher/edit-voucher/${storedVoucherIds}`, requestData);
            console.log(response.data);
            navigate("/")
            // Handle any additional logic, such as navigating back to the main page
        } catch (error) {
            console.error('Error editing voucher:', error);
        }
    };

    return (
        <>
            {
                state.isAuthenticated ? (

                    <div>
                        <h1>Edit Voucher</h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex">
                                <div className="w-1/2 p-4">
                                    <h1 className="text-lg mb-4">Voucher Form</h1>
                                    <div className="mb-4">
                                        <label htmlFor="cheque_no">Cheque No:</label>
                                        <input
                                            type="number"
                                            id="cheque_no"
                                            name="cheque_no"
                                            className="border p-2 w-full"
                                            value={formData.cheque_no}
                                            onChange={(e) => setFormData({ ...formData, cheque_no: parseInt(e.target.value, 10) })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="cheque_date">Cheque Date:</label>
                                        <input
                                            type="date"
                                            id="cheque_date"
                                            name="cheque_date"
                                            className="border p-2 w-full"
                                            value={formData.cheque_date}
                                            onChange={(e) => setFormData({ ...formData, cheque_date: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="currency">Currency:</label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            className="border p-2 w-full"
                                            value={formData.currency}
                                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        >
                                            <option value="" disabled>
                                                Select Currency
                                            </option>
                                            {currencyOptions.map((currency) => (
                                                <option key={currency} value={currency}>
                                                    {currency}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-1/2 p-4 mt-11">
                                    <div className="mb-4">
                                        <label htmlFor="exchange_rate">Exchange Rate:</label>
                                        <input
                                            type="text"
                                            id="exchange_rate"
                                            name="exchange_rate"
                                            className="border p-2 w-full"
                                            value={formData.exchange_rate}
                                            onChange={(e) => setFormData({ ...formData, exchange_rate: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="payRecieveTo">Pay Receive To:</label>
                                        <input
                                            type="text"
                                            id="payRecieveTo"
                                            name="payRecieveTo"
                                            className="border p-2 w-full"
                                            value={formData.payRecieveTo}
                                            onChange={(e) => setFormData({ ...formData, payRecieveTo: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 p-4 mt-11">
                                    <label className="block mb-2">
                                        Account:
                                        <select
                                            name="account"
                                            value={formData.voucherItems[0].account}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            account: e.target.value,
                                                        },
                                                    ],
                                                })
                                            }
                                            className="block w-full p-2 border rounded"
                                        >
                                            <option value="">Select an account</option>
                                            <option value="drawing">Drawing</option>
                                            <option value="expense">Expense</option>
                                            <option value="vehicleExpense">Vehicle Expense</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label className="block mb-2">
                                        Type:
                                        <select
                                            name="type"
                                            value={formData.voucherItems[0].type}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            type: e.target.value,
                                                        },
                                                    ],
                                                })
                                            }
                                            className="block w-full p-2 border rounded"
                                        >
                                            <option value="">Select a type</option>
                                            <option value="debit">Debit</option>
                                            <option value="credit">Credit</option>
                                        </select>
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label>
                                        Amount:
                                        <input
                                            type="text"
                                            className="block w-full p-2 border rounded"
                                            name="amount"
                                            value={formData.voucherItems[0].amount}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            amount: parseInt(e.target.value, 10),
                                                        },
                                                    ],
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label>
                                        Narration:
                                        <input
                                            type="text"
                                            className="block w-full p-2 border rounded"
                                            name="narration"
                                            value={formData.voucherItems[0].narration}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            narration: e.target.value,
                                                        },
                                                    ],
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label className="block mb-2">
                                        Account:
                                        <select
                                            name="account1"
                                            value={formData.voucherItems[0].account1}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            account1: e.target.value,
                                                        },
                                                    ],
                                                })
                                            }
                                            className="block w-full p-2 border rounded"
                                        >
                                            <option value="">Select an account</option>
                                            <option value="drawing">Drawing</option>
                                            <option value="expense">Expense</option>
                                            <option value="vehicleExpense">Vehicle Expense</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label className="block mb-2">
                                        Type1:
                                        <select
                                            name="type1"
                                            value={formData.voucherItems[0].type1}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            type1: e.target.value,
                                                        },
                                                    ],
                                                })
                                            }
                                            className="block w-full p-2 border rounded"
                                        >
                                            <option value="">Select a type</option>
                                            <option value="debit">Debit</option>
                                            <option value="credit">Credit</option>
                                        </select>
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label>
                                        Amount:
                                        <input
                                            type="text"
                                            className="block w-full p-2 border rounded"
                                            name="amount"
                                            value={formData.voucherItems[0].amount1}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            amount1: parseInt(e.target.value, 10),
                                                        },
                                                    ],
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                                <br />
                                <div className="w-1/2 p-4 mt-11">
                                    <label>
                                        Narration1:
                                        <input
                                            type="text"
                                            className="block w-full p-2 border rounded"
                                            name="narration1"
                                            value={formData.voucherItems[0].narration1}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    voucherItems: [
                                                        {
                                                            ...formData.voucherItems[0],
                                                            narration1: e.target.value,
                                                        },
                                                    ],
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                                <br />
                            </div>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' type="submit">Update Voucher</button>
                        </form>
                    </div>
                ) : ("")
            }
        </>
    );
};

export default EditVoucher;
