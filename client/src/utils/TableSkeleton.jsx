import React from 'react'

const TableSkeleton = () => {
    return (
        <div className="table-responsive">
            <table className='table text-nowrap text-md-nowrap mb-0 skeleton_table'>
                <thead>
                    <tr>
                        <th className='line'></th>
                        <th className='line'></th>
                        <th className='line'></th>
                        <th className='line'></th>
                        <th className='line'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='line'></td>
                        <td className='line'></td>
                        <td className='line'></td>
                        <td className='line'></td>
                        <td className='line'></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableSkeleton
