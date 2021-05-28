import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Radio, InputNumber, message, Tag, Popconfirm } from 'antd';
import { fetchStaffList, deleteStaff, fetchStaffDetail, updateStaff, addStaff } from '@/services/staff';
import moment from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default (): React.ReactNode => {

  const [form] = Form.useForm()
  const [staffList, setStaffList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffDetail, setStaffDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [number, setNumber] = useState(0)


  const columns = [
    {
      title: "工号",
      dataIndex: 'userId',
      align: 'center'
    },
    {
      title: "用户名",
      dataIndex: '_id',
      align: 'center',
    },
    {
      title: "用户类型",
      dataIndex: 'type',
      align: 'center',
      render: (text) => text === 'admin' ? <Tag color='green'>管理员</Tag> : <Tag color="blue">普通用户</Tag>
    },
    {
      title: "姓名",
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: "手机号",
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: "住址",
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: "入职时间",
      dataIndex: 'createdAt',
      align: 'center',
      render: (text: any) => text ? <span>{moment(text).format('L')}</span> : ''
    },
    {
      title: "操作",
      dataIndex: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space>
          <Button type="primary" size="small" onClick={() => handleStaffDetail(record)}>编辑</Button>
          <Popconfirm
            title="你确定要删除这个员工吗?"
            onConfirm={() => handleDeleteStaff(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small" disabled={record.type === 'admin'}>删除</Button>
          </Popconfirm>
        </Space>
      )
    },
  ]

  // 处理添加员工按钮
  const handleAddStaff = () => {
    setIsEdit(false);
    setIsModalVisible(true);
    form.resetFields();
  }

  // 删除员工
  const handleDeleteStaff = (id: any) => {
    deleteStaff(id).then(res => {
      message.success("删除员工成功")
      setNumber(number + 1)
    })
  }

  // 获取员工详情
  const handleStaffDetail = (record) => {
    setIsEdit(true);
    fetchStaffDetail(record._id).then(res => {
      setStaffDetail(res);
      form.setFieldsValue({ ...res })
      setIsModalVisible(true)
    })
  }

  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(value => {
      if (isEdit) {
        const data = {
          _id: staffDetail['_id'],
          userId: staffDetail['userId'],
          ...value
        }
        updateStaff(data).then(res => {
          setNumber(number + 1)
          message.success("更新员工信息成功");
        })
      } else {
        value.userId = '1' + Math.floor(Math.random() * 10000);
        console.log(value);
        addStaff(value).then(res => {
          setNumber(number + 1)
          message.success("添加员工信息成功")
        })
      }
      form.resetFields()
      setIsModalVisible(false)
      setIsEdit(false)
    })
  }

  useEffect(() => {
    setTableLoading(true)
    fetchStaffList().then(res => {
      setStaffList(res);
      console.log(res);
      setTableLoading(false);
    })
  }, [number])

  return (
    <Card className="dishManageStyle">
      <Button type="primary"
        style={{ float: 'right', marginBottom: '16px' }}
        onClick={handleAddStaff}
      >新增</Button>
      <Table
        bordered
        rowKey="_id"
        dataSource={staffList}
        columns={columns}
        loading={tableLoading}
        size="small"
      />
      <Modal title={isEdit ? '编辑员工信息' : '添加员工信息'} visible={isModalVisible} onOk={handleSubmit} onCancel={() => setIsModalVisible(false)}>
        <Form
          {...layout}
          form={form}
          style={{ width: 350, margin: '0 auto' }}
        >
          {/* <Form.Item
            label="用户名"
            name="_id"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input allowClear />
          </Form.Item> */}
          {/* <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input allowClear />
          </Form.Item> */}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '请输入地址!' }]}
          >
            <Input allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
