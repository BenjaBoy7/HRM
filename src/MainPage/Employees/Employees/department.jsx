
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"

import { baseUrl } from '../../../Entryfile/BaseUrl';

const Department = () => {


    const [department, setDepartment] = useState([{}]);
    const [departmentname, setDepartmentName] =  useState("");
    const [departmentDelete, setDepartmentDelete] =  useState(0)


    useEffect(() => {
      axios.get(baseUrl+"departments")
      .then(res => {
        setDepartment(res.data.departments)
      })
    }, [department])

    function handleChange (e) {
      e.preventDefault();
      setDepartmentName(e.target.value)
      // console.log("sucessfull added", e.target.value);
    
    }

    function handleSubmit (event) {
      event.preventDefault();
      const data = {department: departmentname}
      // console.log("data sent",data);

      axios.post(baseUrl+"departments", data)
        .then(res => {
          // console.log(res);
          // console.log("responded from server", res.data);
        })
    }

    // function handleSubmit() {
    //   event.preventDefault();
    //   const user = {
    //     name: this.state.name
    //   }
    //   axios.post(baseUrl+"departments", department)
    //     .then(res=>{
    //       console.log(res);
    //       console.log(res.data);
    //       window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
    //     })
    // }


    function deleteDepartmnet (e) {
      event.preventDefault();
            
      // const data = {id: departmentname}
      alert(departmentDelete);

      axios.delete(baseUrl+"departments/"+ departmentDelete)
        .then(res => {
          // window.location.reload()
           console.log("responded from server", res.data);
        })

    }
 
     const onDeleteDepartment =(record) => {
       console.log(record)
          // setDepartment(pre=>{
          // return pre.filter(department=> department.id != record.id)
          // })
          // department=>department.id !=record)
          axios.delete(baseUrl+"departments/"+ record)
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
                    <a className="dropdown-item" href="#"  data-bs-toggle="modal" data-bs-target="#edit_department"><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" data-bs-toggle="modafl"  onClick={()=>{onDeleteDepartment(record.id)}} data-bs-target="#delete_department"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
              </div>
            ),
        }, 
      ]
      return (         
      <div className="page-wrapper">
        <Helmet>
            <title>Department - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Department</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Department</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_department"><i className="fa fa-plus" /> Add Department</a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
          <div className="table-responsive">
              
              <Table className="table-striped"
                    pagination= { {total : department.length,
                      showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={department}
                    rowKey={record => record.id}
                    // onChange={console.log("change")}
                  />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Department Modal */}
      <div id="add_department" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Department</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <form> */}
                <div className="form-group">
                  <label>Department Name <span className="text-danger">*</span></label>
                  <input className="form-control" onChange={handleChange} type="text" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      {/* /Add Department Modal */}
      {/* Edit Department Modal */}
      <div id="edit_department" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Department</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Department Name <span className="text-danger">*</span></label>
                  <input className="form-control" onChange= {()=>handleChange} defaultValue="IT Management" type="text" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Department Modal */}
      {/* Delete Department Modal */}
      <div className="modal custom-modal fade" id="delete_department" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Department</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" onClick={deleteDepartmnet} className="btn btn-primary continue-btn">Delete</a>
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
      {/* /Delete Department Modal */}
    </div>
        );
}

export default Department;
