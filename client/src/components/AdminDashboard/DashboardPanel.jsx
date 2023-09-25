import React, { useEffect, useState } from 'react'
import CustomCard from '../../utils/CustomCard';
import { useSelector, useDispatch } from 'react-redux';
import { useItems } from '../../queries/getUsers';
import { useContactItems } from '../../queries/getContacts';
import { getAllMovies } from '../../redux/apiCalls';
import AllUsers from './AllUsers/AllUsers';

const DashboardPanel = () => {
  const { movies } = useSelector(state => state.movie);
  const user = useSelector(state => state.user.user);
  const { data, status } = useItems();
  const { data: contacts, status: contactStatus } = useContactItems();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMovies(dispatch);
  }, [dispatch]);

  return (
    <div>
      <div className="page-header-admin-dashboard">
        <h2 className='title'>Welcome To Dashboard</h2>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-sm-12">
              <div className="bg-primary custom-card card-box card">
                <div className="p-4 card-body">
                  <div className="align-items-center row">
                    <div className="col-xl-8 col-sm-6 col-12 img-bg  offset-xl-3 offset-sm-6 col">
                      <h4 className="d-flex  mb-3">
                        <span className="font-weight-bold text-white ">{user?.name} {user?.lastName}</span>
                      </h4>
                      <p className="tx-white-7 mb-1">Welcome again, here are your application data.</p>
                    </div>
                    <img src="/images/work3.png" alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="All Movies" subTitle="Movies on App" number={movies?.length} />
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="All Users" subTitle="Users on App" number={data?.length} />
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="All Data" subTitle="Data on App" number="15" />
            </div>
            <div className="col-xl-4 col-lg-6 col-sm-12">
              <CustomCard title="All Contacts" subTitle="Contacts" number={contacts?.length} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="custom-card card">
            <div className="card-body">
              <div className="content-label">All Users</div>
              <table className='table'>
                <tbody>
                  <AllUsers users={data} status={status} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPanel;
