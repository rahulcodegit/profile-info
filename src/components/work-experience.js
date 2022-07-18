import React, {useState, useEffect } from 'react'
import {Col, Row, Button, Checkbox, Form, Input, Modal, DatePicker, Image} from 'antd';
import moment from "moment";

function Workexperience() {
  const [form] = Form.useForm();
  const [checkdate, setCheckdate] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [userImage1, setUserImage1] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleExp, setIsModalVisibleExp] = useState(false);
  const [expData, setexpData]  = useState(JSON.parse(localStorage.getItem('allworkexp')) || [])
  const [deletecompanyname, setdeletecompany] = useState(''); 
  const [editClicked, seteditClicked] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [editexpDetails, setEditExpDetails] = useState({
    jobtitle:"",
    companyname: "",
    enddate: "",
    jobdescription: ""
  });

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  // getting work experience data and setting it
  const onFinish = (values) => {
    setCheckdate(false)
    values['company_logo']  = userImage1;
    let newworkexp = {}
    
    let getprevexp = JSON.parse(localStorage.getItem('allworkexp')) || [];
    if(getprevexp.length > 0 && editClicked){
      setisActive(true)
      let defaultStartDate = moment(values.startdate, 'YYYY/MM/DD');
      let defaultEndDate = moment(values.enddate, 'YYYY/MM/DD'); 

      let value = values.startdate;
      let month = moment(value).startOf("month").format('MMMM')

      if(values.enddate){
        var enddate = values.enddate;
        var endmonth = moment(enddate).startOf("month").format('MMMM')
        var endyear= moment(enddate).year()
      }
      let updatedCompany = getprevexp.map(el => el.companyname === deletecompanyname ? {...el,       jobtitle:values.jobtitle,
        companyname:values.companyname,
        startdate: defaultStartDate,
        enddate: defaultEndDate,
        jobdescription: values.jobdescription,
        company_logo: values.company_logo,
        start_month:month,
        start_year:moment(value).year(),
        end_month:endmonth,
        end_year:endyear ? endyear : 'Present' 
      } : el)

      getprevexp  = [...updatedCompany];
    }else{
      let value = values.startdate;
      let month = moment(value).startOf("month").format('MMMM')

      newworkexp['start_month']=month
      newworkexp['start_year']=moment(value).year()

      if(values.enddate){
        let enddate = values.enddate;
        let endmonth = moment(enddate).startOf("month").format('MMMM')
        newworkexp['end_month']=endmonth
        newworkexp['end_year']= moment(enddate).year()
      }else{
        newworkexp['end_year']='Present'
      }
      let allValues = Object.assign(values, newworkexp)
      getprevexp.push(allValues)
    }
    
    localStorage.setItem('allworkexp', JSON.stringify(getprevexp))
    let gettingAlldata = JSON.parse(localStorage.getItem('allworkexp'))
    setexpData(gettingAlldata)  

    seteditClicked(false)
    setUserImage1(null)
    setIsModalVisibleExp(false);
    setEditExpDetails({})
  };

  useEffect(() => {
  }, [expData]);

  useEffect(() => {
  }, [userImage1, endDate]);


  const showModalExp = (param, hideImage) => {
    if(hideImage){
      setUserImage1(null)
    }
    setIsModalVisibleExp(true);
  };

  const handleCancelExp = () => { setIsModalVisibleExp(false); }
  
  const enableEndDate = () => { setCheckdate(false)}

  // Editing work experience data
  const editDetails = (item) =>{
    setdeletecompany(item)
    seteditClicked(true)
    let editSelectedCompany = JSON.parse(localStorage.getItem('allworkexp')).filter((o, i) => item === o.companyname);
    setUserImage1(editSelectedCompany[0].company_logo)
    let defaultStartDate = moment(editSelectedCompany[0].startdate, 'YYYY/MM/DD');
    let defaultEndDate =  editSelectedCompany[0].enddate ? moment(editSelectedCompany[0].enddate, 'YYYY/MM/DD') : moment()
    if (!editSelectedCompany[0].enddate) {
      setCheckdate(true)
    } else {
      setCheckdate(false)
    }
    
    form.setFieldsValue( {
      jobtitle:editSelectedCompany[0].jobtitle,
      companyname:editSelectedCompany[0].companyname,
      startdate: defaultStartDate,
      enddate: defaultEndDate,
      jobdescription: editSelectedCompany[0].jobdescription
      })
  }

  useEffect(() => {
  }, [editexpDetails]);

  const resetValue= () => {form.resetFields(); }

  // setting the company logo
  const onImageChange = (event) =>{
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        imageString(file).then(imagestring => {
          localStorage["companylogo"] = imagestring;
        }); 
      setUserImage1(URL.createObjectURL(event.target.files[0]));
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


  //Toggling End Date
  const onCheckboxChange = (e) => {
    setCheckdate(e.target.checked)
    if(e.target.checked){
      form.setFieldsValue({enddate: ''})
    }
    setEndDate(null)
    checkdate ? setisActive(true) : setisActive(false);    

};

// Can not select days after today
const disabledDate = (current) => {
  return current && current > moment().endOf('day');
};


  const showModal = (item) => {
    setdeletecompany(item)
    setIsModalVisible(true);
  };

  // deleting work experience
  const handleOk = (item) => {
    let deletecompany = JSON.parse(localStorage.getItem('allworkexp')).filter((o, i) => deletecompanyname !== o.companyname);
    localStorage.setItem('allworkexp', JSON.stringify(deletecompany))
    setexpData(deletecompany) 
    setIsModalVisible(false);
    setdeletecompany('')
  };

  const getStartDate = (e) =>{
    setStartDate(moment(e).format("YYYY-MM-DD"))
  }

  // disabling end data for current company
  const disabledEndDate = (current) =>{
    let customDate = startDate;
     if(current && current < moment(customDate, "YYYY-MM-DD")){
      return true
     }
     if(current && current > moment().endOf('day')){
      return true
     }
     return false
  }

  const handleCancel = () => {setIsModalVisible(false)};

  return (
    <>
      <Row>
        <Col span={24}>
          
          <h2 >
            Work Experience
            <span className="we_btn">
            <Button type="primary"
                        onClick={() => {
                          showModalExp(true, "hideimage"); resetValue(); enableEndDate();
                        }}>Add Work Experience</Button>
          </span>
        </h2>
        <div>

        <Modal  title="Edit work Experience" visible={isModalVisibleExp} footer={null} onCancel={handleCancelExp}>
            <Form
            form = {form}
            name="basic"
            initialValues={editexpDetails}
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
          <Form.Item name="uploadlogo" className='uploadlogo' >
          <div className="user_pic form">
            {userImage1 ? <Image width={200} src={userImage1} alt=" " preview={false}/> : ''}

            <div className="file-input">
            <input type="file" onChange={onImageChange} accept="image/*" id="file2" className="file" />
            <label htmlFor="file2">Company logo</label>
            </div>
          </div>
          </Form.Item>

          <Form.Item
                    label="Job Title"
                    name="jobtitle"  
                    rules={[
                    {
                        required: true,
                        message: 'Please enter your Title!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
  
                <Form.Item
                    label="Company"
                    name="companyname"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your companyname!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
  
                <Form.Item
                    label="Start Date"
                    name="startdate"
                    rules={[
                      {
                          required: true,
                          message: 'Please input your Start date!',
                      },
                      ]}
                >
                    <DatePicker onChange={(e)=>getStartDate(e)} disabledDate={disabledDate} style={{ width: '100%' }} />
  
                </Form.Item>
  
                <Form.Item
                    label="End Date"
                    name="enddate"
                    rules={[
                      {
                            required: isActive,
                            message: 'Please input your end date!',
                          
                      },
                      ]}   
                >
                    <DatePicker  disabledDate={disabledEndDate} disabled={checkdate}  style={{ width: '100%' }} />
   
                </Form.Item>

                <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
                name="checkbox"
                >
                <Checkbox checked={checkdate} onChange={onCheckboxChange}>
                   I'm currently working in this company
                </Checkbox>

            </Form.Item>
  
                <Form.Item
                    label="Job description"
                    name="jobdescription"   
                >
                    <Input  />
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
      
        </div>
         <div>
          <Row>
             <Col xs={24} span={24}>
                <div className="exp_info">
                  <div>
                    {expData.map((item, index) =>{
                      return <React.Fragment key= {index}>
                      <div className='companylist' >
                        <Row justify="space-around" align="middle">
                          <Col xs={24} lg={16} span={16}>

                          <Col  span={8} className="user_pic companylogo">

                            {item.company_logo ? <Image width={200} src={item.company_logo} preview={false} alt=" " /> : ''}
                          </Col>

                          <h3>Job Title : <span>{item.jobtitle}</span></h3>
                          <p className='company'>Company  : <span>{item.companyname}</span></p>
                          <p className='exp'>Experience  : <span> {item.start_month}  {item.start_year}</span> - <span>{item.end_month}  {item.end_year}</span></p>
                          <p className='desc'>Job description : <span>{item.jobdescription ? item.jobdescription : ""}</span></p>
                            </Col>
                            <Col xs={24} lg={8} span={8} className="expaction">
                             <Button type="primary" onClick={(e) => {editDetails(item.companyname);showModalExp(true);}}>Edit</Button>

                             <Button type="danger" onClick={() => {showModal(item.companyname)}}>Delete</Button>
                            </Col>

                            <Modal title="Delete Company" visible={isModalVisible
                            } onOk={() => {handleOk(item.companyname)}} onCancel={handleCancel}>
                            Are you sure you want to delete this Company?
                          </Modal>
                            
                        </Row>
                      </div>
                      </React.Fragment>
                    })}

                  </div>
                  
                </div>
                
             </Col>
          </Row>
          </div> 
        </Col>
      </Row>
    </>
  )
}

export default Workexperience;