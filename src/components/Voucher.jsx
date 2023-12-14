import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Voucher = () => {
    const [vouchersDatas, setVouchersDatas] = useState([]);

    useEffect(() => {
        const fetchVoucherData = async () => {
            try {
                const response = await axios.get('https://backend-auth-x6d3.onrender.com/api/vosucher/getvoucher');
                setVouchersDatas(response.data.data);
            } catch (error) {
                console.error('Error fetching voucher data:', error);
            }
        };

        fetchVoucherData();
    }, []);
    return (
        <div>
            {/* <h1 className="text-lg mb-4">Voucher List</h1>
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
                    {Array.isArray(vouchersDatas) && vouchersDatas.map((voucher) => (
                        <tr key={voucher.id}>
                            <td className="border p-2">{voucher.id}</td>
                            <td className="border p-2">{voucher.cheque_no}</td>
                            <td className="border p-2">{voucher.cheque_date}</td>
                            <td className="border p-2">{voucher.currency}</td>
                            <td className="border p-2">{voucher.exchange_rate}</td>
                            <td className="border p-2">{voucher.payRecieveTo}</td>
                            <td className="border p-2">
                                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Add More Data</button>&nbsp;
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Edit</button>
                                &nbsp;
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default Voucher;
