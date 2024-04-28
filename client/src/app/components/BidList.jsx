import React from 'react';

const BidList = ({ bids }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tender
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           End Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bids In Last 5 Min
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {bids.length > 0 && bids?.map((bid) => (
                        <tr key={bid._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {bid.user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {bid.tender.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                ${bid.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(bid.time).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {bid.isBidPlacedInLast5Min ? "YES" : "NO"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BidList;
