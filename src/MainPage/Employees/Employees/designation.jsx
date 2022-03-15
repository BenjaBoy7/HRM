
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"

import { baseUrl } from '../../../Entryfile/BaseUrl';

const Designations = () => {

  
  const [designation, setDesignation] = useState([{}]);
  const [designationname, setDesignationname] =  useState("");
  const [departmentDelete, setDepartmentDelete] =  useState(0)
  const [departmentId, setDepartmentId] =  useState(0)

  
  const [department, setDepartment] = useState([{}]);

  useEffect(() => {
    axios.get(baseUrl+"designations")
    .then(res => {
      setDesignation(res.data.designations)
    })
  }, [designation])

  useEffect(() => {
    axios.get(baseUrl+"departments")
    .then(res => {
      setDepartment(res.data.departments)
    })
  }, [department])

  function handleChange(e){
    // e.preventDefault();
    setDesignationname(e.target.value)
    // console.log("sucessfull added", e.target.value);
  }

  function handleChangeDep(e) {
    // e.preventDefault();
    setDepartmentId(e.target.value)
    console.log("data sent", designationname+"-"+departmentId)
  }

  function handleSubmit (event) {
    event.preventDefault();
    const data = {department_id: departmentId, designationName: designationname}
     console.log("data sent",data);

    axios.post(baseUrl+"designations", data)
      .then(res => {
        // console.log(res);
        console.log("responded from server", res.data);
      })
  }

    useEffect( ()=>{
      if($('.select').length > 0) {
        $('.select').select2({
          minimumResultsForSearch: -1,
          width: '100%'
        });
      }
    }); 


    const onDeleteDesignation =(record) => {
      // console.log(record)
         // setDepartment(pre=>{
         // return pre.filter(department=> department.id != record.id)
         // })
         // department=>department.id !=record)
         axios.delete(baseUrl+"designations/"+ record)
         .then(res => {
           // window.location.reload()
            console.log("deleted the departement successfully", res.data);
         })

    }


      const columns = [        
        {
          title: '#',
          dataIndex: 'id',
          sorter: (a, b) => a.id.length - b.id.length,
        },
        {
          title: 'Designation',
          dataIndex: 'designationName',
          sorter: (a, b) => a.designationName.length - b.designationName.length,
        },
        {
          title: 'Department',
          dataIndex: 'department',
          sorter: (a, b) => a.department.length - b.department.length,
        },
        {
          title: 'Action',
          render: (text, record) => (
              <div className="dropdown dropdown-action text-end">
                   <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modall"  onClick={()=>{onDeleteDesignation(record.id)}} data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
              </div>
            ),
        }, 
      ]
      return (         
      <div className="page-wrapper">
        <Helmet>
            <title>Designations - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Designations</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Designations</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_designation"><i className="fa fa-plus" /> Add Designation</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              
            <Table className="table-striped"
                  pagination= { {total : designation.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={designation}
                  rowKey={record => record.id}
                  // onChange={console.log("change")}
                />
              {/* <table className="table table-striped custom-table mb-0 datatable">
                <thead>
                  <tr>
                    <th style={{width: '30px'}}>#</th>
                    <th>Designation </th>
                    <th>Department </th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Web Designer</td>
                    <td>Web Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Web Developer</td>
                    <td>Web Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Android Developer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>IOS Developer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>UI Designer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>UX Designer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>IT Technician</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Product Manager</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>SEO Analyst</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Front End Designer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Front End Developer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>Systems Engineer</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>Systems Administrator</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>Technical Lead</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td>Quality Assurance</td>
                    <td>Application Development</td>
                    <td className="text-end">
                      <div className="dropdown dropdown-action">
                        <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Designation Modal */}
      <div id="add_designation" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Designation</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <form> */}
                <div className="form-group">
                  <label>Designation Name <span className="text-danger">*</span></label>
                  <input className="form-control" onChange={handleChange} type="text" />
                </div>
                <div className="form-group">
                  <label>Department <span className="text-danger">*</span></label>
                  <select onChange={handleChangeDep} className="" >
                    <option>Select Department</option>
                    {department.map((dep, i) => (
                        <option value={dep.id} >{dep.department}</option> 
                    ))}

                  </select>
                </div>
                <div className="submit-section">
                  <button onClick={handleSubmit} className="btn btn-primary submit-btn">Submit</button>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      {/* /Add Designation Modal */}
      {/* Edit Designation Modal */}
      <div id="edit_designation" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Designation</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Designation Name <span className="text-danger">*</span></label>
                  <input className="form-control" defaultValue="Web Developer" type="text" />
                </div>
                <div className="form-group">
                  <label>Department <span className="text-danger">*</span></label>
                  <select className="select">
                    <option>Select Department</option>
                    <option>Web Development</option>
                    <option>IT Management</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Designation Modal */}
      {/* Delete Designation Modal */}
      <div className="modal custom-modal fade" id="delete_designation" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Designation</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Designation Modal */}
    </div>
        );
}

export default Designations;
