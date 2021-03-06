import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Card, CardBody, Button, ButtonToolbar, ModalHeader, ModalBody, Modal, Alert, CardHeader, InputGroup, InputGroupText, InputGroupAddon, FormInput} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Loading from "../components/loading/Loading";

import {fetchListStudents,fetchBlocklUser} from '../actions/actionUser'



const ManagerStudents = (props) => {

  const [openModal, setOpenModal] = useState(false);
  const [userID, setUserID] = useState('');
  const [status, setStatus] = useState('');
  const [visibleMess, setVisibleMess] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

const {messageStudent,listStudents,totalStudents, fetchListStudents,fetchBlocklUser} = props;

const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        await fetchListStudents(token);
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchDataUser();
  }, []);

function setInfoModal(id, status){
  setOpenModal(!openModal);
  setUserID(id); 
  setStatus(status)
}

const setPagination = () => {
  var tempt = totalStudents % 10 === 0 ? 0: 1;
  let totalPage = parseInt(totalStudents / 10 + tempt);
  var pages = [];
  if(totalPage > 1){
  for (let i = 0; i < totalPage; i++){
    pages.push(<Button key={i} type="button" theme="primary" outline className="btn-pagination" disabled={currentPage === i ? true : false} onClick={() => {setCurrentPage(i); fetchListStudents(token,i)}}>{i+1}</Button>)
  }}
  return(<div className="mb-3 create-account">
    <Button type="button" theme="primary" className="btn-pagination" hidden={totalPage === 1 ? true : false} disabled={currentPage === 0 ? true : false} onClick={() => {setCurrentPage(currentPage-1); fetchListStudents(token,currentPage -1)}}><i className="material-icons">
    navigate_before
    </i></Button>
    {pages}
  <Button type="button" theme="primary" className="btn-pagination" hidden={totalPage === 1 ? true : false} disabled={currentPage + 1  === totalPage ? true : false} onClick={() => {setCurrentPage(currentPage+1); fetchListStudents(token,currentPage+1)}}><i className="material-icons">
  navigate_next
  </i></Button></div>)
};

let rowsUser;

if(listStudents !== null){
  rowsUser = listStudents.map((user, index) => {
    return(
                <tr key={index}>
                  <td><center>{index+1}</center></td>
                  <td><center>{user.username}</center></td>
                  <td><center>{user.email}</center></td>
                  <td><center>{(user.status === 'active') ? <i className="material-icons icon-green">done</i> : <i className="material-icons icon-red">highlight_off</i>}</center></td>
                  <td><center>
                  <Button theme="while" className="p-0 btn-icon" title="Xem chi tiết" onClick={() => {}}><Link to={`/user-detail/${user._id}`}><i className="material-icons icon-blue">remove_red_eye</i></Link></Button>
                  <Button theme="while" className="p-0 btn-icon" title="Khóa tài khoản" onClick={() => {setInfoModal(user._id,'block')}}><i className="material-icons ml-2 icon-red">block</i></Button>
                  <Button theme="while" className="p-0 btn-icon" title="Mở khóa tài khoản" onClick={() => {setInfoModal(user._id,'active')}}><i className="material-icons ml-2 icon-green">lock_open</i></Button>
                  </center></td>            
               </tr>
    )
});
}else{
  return <Loading/>
}

return(
<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Người học" subtitle="Quản lý" className="text-sm-left" />
    </Row>
    {messageStudent ? <Container fluid className="px-0 mb-3">
                <Alert className="mb-0" dismissible={() => setVisibleMess(false)} open={visibleMess}>
                <i className="fa fa-info mx-2"></i>{messageStudent}
                </Alert>
        </Container> : null}
    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
        <CardHeader className="border-bottom">
        <ButtonToolbar>
          <span className="ml-3 pt-1 fs-header-table">
            Danh sách Người học{" "}
          </span>

          <InputGroup seamless size="lg" className="ml-auto mr-3">
            <FormInput placeholder="Tìm kiếm..." />
            <InputGroupAddon type="append">
              <InputGroupText>
                <i className="material-icons">search</i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </ButtonToolbar>
      </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                  <center>#</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Họ và tên</center>
                  </th>
                  <th scope="col" className="border-0">
                    <center>Email</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Trạng thái</center>
                  </th>
                  <th scope="col" className="border-0">
                  <center>Chức năng</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsUser}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    {setPagination()}
    <Modal size="sm" open={openModal} toggle={() => setOpenModal(!openModal)} centered>
      <ModalHeader>{status === 'block' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}</ModalHeader>
      <ModalBody className="p-3">

        <label className="mb-3">Bạn có chắc chắn muốn <b className="text-danger">{status === 'block' ? 'khóa' : 'mở khóa'}</b> người dùng này không ?</label>    
      <center>
        <Button theme="secondary" className="mr-3" type="button"  onClick={() => setOpenModal(!openModal)}>Hủy</Button>
        <Button type="submit"  onClick={() => {setOpenModal(!openModal); fetchBlocklUser(token, userID , status,0)}}>Đồng ý</Button>
      </center>

      
      </ModalBody>
    </Modal>
    </Container>
)
};

const mapStateToProps = (state) => {
  return {
      messageStudent: state.authReducer.messageStudent,
      listStudents: state.authReducer.listStudents,
      totalStudents: state.authReducer.totalStudents
  };
};

export default connect(mapStateToProps,{fetchListStudents,fetchBlocklUser})(ManagerStudents);