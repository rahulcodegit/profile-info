import React, {useState} from 'react'
import HeaderPage from './header';
import Workexperience from './work-experience';
import {Col, Row, Button, Form, Input, Modal, Image, DatePicker } from 'antd';
import moment from "moment";
import { Layout } from 'antd';
const { Content } = Layout;


function Basicinfo() {

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [basicinfo, setBasicInfo] = useState({});

  // fetching data from local storage and setting it
  const showModal = () => {
    setIsModalVisible(true);
    if(localStorage.getItem('defaultAge') !== null){
    let dd = localStorage.getItem('defaultAge') ? localStorage.getItem('defaultAge') : null
    let formatdd = dd ? moment(dd).format("YYYY/MM/DD") : null

    let defaultAge = formatdd ?  moment(formatdd) :moment();
    
    setBasicInfo({
      firstname:localStorage.getItem('firstname'),
      lastname:localStorage.getItem('lastname'),
      dob: defaultAge ? moment(defaultAge, 'YYYY/MM/DD') : moment()
    })
  }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };  

  // getting user data from form and setting in local storage
  const onFinish = (values) => {
    localStorage.setItem('firstname', values.firstname);
    localStorage.setItem('lastname', values.lastname);
    localStorage.setItem('defaultAge', values.dob)
    let calculateAge  = moment().diff(moment(values.dob, 'DD MMM YYY'), 'years')
    localStorage.setItem('age', calculateAge);
    setIsModalVisible(false);
  };

  // for uploading profile pic
  const onImageChange = (event) =>{
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        imageString(file).then(imagestring => {
          localStorage["profilepic"] = imagestring;
        }); 
      setUserImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const imageString = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }

  // Can not select days after today
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    <>
    <Modal title="Edit Information" visible={isModalVisible} onCancel={handleCancel} footer={null}>
    <Form
        form = {form}
        initialValues={basicinfo}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="user_pic">
            {userImage ? <Image preview={false} width={200} src={userImage} alt=" " /> : <Image width={200} src={localStorage.getItem('profilepic')} preview={false} alt="" />}
            
            <div className="file-input basicinfo">
              <input type="file" onChange={onImageChange} id="file" accept="image/*" className="file" />
              <label htmlFor="file">Upload Profile</label>
            </div>
        </div>
        <Form.Item
                  label="First Name"
                  name="firstname"  
                  rules={[
                  {
                      required: true,
                      message: 'Please input your firstname!',
                  },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Last name"
                  name="lastname"
                  value={ localStorage.getItem('lastName')}    
                  rules={[
                  {
                      required: true,
                      message: 'Please input your lastname!',
                  },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Date of Birth"
                  name="dob"
                  rules={[
                  {
                      required: true,
                      message: 'Please input your age!',
                  },
                  ]}
              >
                  <DatePicker disabledDate={disabledDate} style={{width:'100%'}} />
              </Form.Item>
              <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
      </Form>
      </Modal>
      <HeaderPage />
      <Layout>
        <Content>
      <div className="main work_exp">
        <Row>
            <Col xs={24} lg={8} span={8} className="user_pic">

            {userImage ? <Image preview={false} width={200} src={userImage} alt=" " /> : <Image width={200} src={localStorage.getItem('profilepic')} preview={false} alt="" />}
            
            <div className="file-input basicinfo">
              <input type="file" onChange={onImageChange} id="file1" accept="image/*" className="file" />
              <label htmlFor="file1">Upload Profile</label>
            </div>
            </Col>
            <Col xs={24} lg={16}  className='header_info' >
                <Row>
                    <Col xs={24} lg={16} >
                        Name: 
                        <h3 className='username'>
                        {localStorage.getItem('firstname')}
                        <span></span>
                        {localStorage.getItem('lastname')}
                        </h3>
                        <div className="info_age">Age: 
                      <h3>{localStorage.getItem('age')}</h3></div>
                    </Col>
                    <Col xs={24} lg={8}>
                    <div className='editButton'>
                    <Button
                        type="primary"
                        onClick={showModal}
                    >
                        Edit Information
                    </Button>
                    </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        
        <Workexperience />
      </div>
      </Content>
      </Layout>
    </>
  )
}

export default Basicinfo