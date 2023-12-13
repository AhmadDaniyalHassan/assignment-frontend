import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate()
    const idGet = localStorage.getItem('usersId')
    const [debitCreditTypeError, setDebitCreditTypeError] = useState(null);
    const [debitCreditAmountError, setDebitCreditAmountError] = useState(null);
    const { state } = useAuth();
    const [vouchersDatas, setVouchersDatas] = useState([])
    const userId = state.user ? state.user.id : null;
    const [formData, setFormData] = useState({
        cheque_no: '',
        cheque_date: '',
        currency: '',
        exchange_rate: '',
        payRecieveTo: '',
        userId: parseFloat(idGet),
        voucherItems: [
            {
                account: '',
                type: '',
                amount: '',
                narration: '',
                account1: '',
                type1: '',
                amount1: '',
                narration1: ''
            }
        ]

    });
    console.log(idGet)
    const currencyOptions = ['USD', 'PKR', 'EUR', 'GBP'];


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const convertedFormData = {
            ...formData,
            cheque_no: Number(formData.cheque_no),
        };



        try {
            // Send the entire formData object to the backend
            const response = await axios.post('https://80c8-111-88-181-82.ngrok-free.app/api/voucher/addVoucher', convertedFormData);
            console.log(response.data);
            console.log(convertedFormData);
            fetchVoucherData();

        } catch (error) {
            console.error('Error submitting data:', error);
            setDebitCreditTypeError('Error type needs to be unique or Error amount need to be same.', error.response.data.message);

        }
    };
    const fetchVoucherData = async () => {
        try {
            const response = await axios.post('https://80c8-111-88-181-82.ngrok-free.app/api/voucher/getvoucher');
            setVouchersDatas(response.data.data);
        } catch (error) {
            console.error('Error fetching voucher data:', error);
        }
    };

    const handleEditClick = (voucherId) => {
        // Save the voucherId to localStorage
        localStorage.setItem('editVoucherId', voucherId);

        // Navigate to the edit page
        navigate(`/edit/${voucherId}`);
    };



    useEffect(() => {
        fetchVoucherData();
    }, []); // Fetch voucher data on component mount

    return (
        <>

            <form onSubmit={handleFormSubmit}>
                {state.isAuthenticated ? (
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
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            account: e.target.value
                                        }]
                                    })}

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
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            type: e.target.value
                                        }]
                                    })}

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
                                <input type="text" className="block w-full p-2 border rounded"
                                    name="amount" value={formData.voucherItems[0].amount}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            amount: parseInt(e.target.value, 10)
                                        }]
                                    })}

                                />
                            </label>
                        </div>
                        <br />
                        <div className="w-1/2 p-4 mt-11">
                            <label>
                                Narration:
                                <input type="text" className="block w-full p-2 border rounded"
                                    name="narration" value={formData.voucherItems[0].narration}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            narration: e.target.value
                                        }]
                                    })} />
                            </label>
                        </div>
                        <br />
                        <div className="w-1/2 p-4 mt-11">
                            <label className="block mb-2">
                                Account:
                                <select
                                    name="account1"
                                    value={formData.voucherItems[0].account1}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            account1: e.target.value
                                        }]
                                    })}

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
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            type1: e.target.value
                                        }]
                                    })}

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
                                <input type="text" className="block w-full p-2 border rounded"
                                    name="amount" value={formData.voucherItems[0].amount1}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            amount1: parseInt(e.target.value, 10)
                                        }]
                                    })}
                                />
                            </label>
                        </div>
                        <br />
                        <div className="w-1/2 p-4 mt-11">
                            <label>
                                Narration1:
                                <input type="text" className="block w-full p-2 border rounded"
                                    name="narration1" value={formData.voucherItems[0].narration1}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        voucherItems: [{
                                            ...formData.voucherItems[0],
                                            narration1: e.target.value
                                        }]
                                    })} />
                            </label>
                        </div>
                        <br />

                    </div>
                ) : (
                    ""
                )}
                {state.isAuthenticated ? (
                    <>
                        <div>
                            {/* Display error messages if they exist */}
                            {debitCreditTypeError && <p className="error text-red-600 ml-4">{debitCreditTypeError}</p>}
                            {debitCreditAmountError && <p className=" text-red-600 error ml-4">{debitCreditAmountError}</p>}
                            {/* ... rest of your JSX */}
                        </div>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Add Voucher</button>
                    </>
                ) : (""
                )}
                <div>
                    <h1 className="text-lg mb-4">Voucher List</h1>
                    <table className="border-collapse border w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Cheque No</th>
                                <th className="border p-2">Cheque Date</th>
                                <th className="border p-2">Currency</th>
                                <th className="border p-2">Exchange Rate</th>
                                <th className="border p-2">Pay Receive To</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(vouchersDatas) &&
                                vouchersDatas.map((voucher) => (
                                    <React.Fragment key={voucher.id}>
                                        <tr>
                                            <td className="border p-2">{voucher.id}</td>
                                            <td className="border p-2">{voucher.cheque_no}</td>
                                            <td className="border p-2">{voucher.cheque_date}</td>
                                            <td className="border p-2">{voucher.currency}</td>
                                            <td className="border p-2">{voucher.exchange_rate}</td>
                                            <td className="border p-2">{voucher.payRecieveTo}</td>
                                            {state.isAuthenticated ? (
                                                <td className="border p-2">
                                                    <>
                                                        <button
                                                            onClick={() => handleEditClick(voucher.id)}
                                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                                                        >
                                                            Edit
                                                        </button>
                                                        &nbsp;

                                                    </>
                                                </td>
                                            ) : ("")}
                                        </tr>
                                        {voucher.VoucherItem && (
                                            <tr>
                                                <td colSpan="7">
                                                    <table className="border-collapse border w-full">
                                                        <thead>
                                                            <tr className="bg-gray-50">
                                                                <th className="border p-2">Voucher Items</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border p-2">
                                                                    <div>
                                                                        <strong>id:</strong> {voucher.VoucherItem.id}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Account:</strong> {voucher.VoucherItem.account}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Type:</strong> {voucher.VoucherItem.type}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Amount:</strong> {voucher.VoucherItem.amount}
                                                                    </div>
                                                                    <div className='border-b-2'>
                                                                        <strong>Narration:</strong> {voucher.VoucherItem.narration}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Account1:</strong> {voucher.VoucherItem.account1}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Type1:</strong> {voucher.VoucherItem.type1}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Amount1:</strong> {voucher.VoucherItem.amount1}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Narration1:</strong> {voucher.VoucherItem.narration1}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                        </tbody>
                    </table>
                </div>



            </form >
        </>
    );
};

export default Home;
