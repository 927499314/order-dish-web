import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Button, Space, Tag, Input, Modal, message, Radio, Popconfirm } from 'antd';
import { addMealTable, fetchMealTable, updateMealTable, deleteMealTable, MealTableDetail } from '@/services/MealTable';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export default (): React.ReactNode => {
  let [form] = Form.useForm()
  let [mealTableList, setMealTableList] = useState([]);
  let [tableLoading, setTableLoading] = useState(false);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [mealTableDetail, setMealTableDetail] = useState({});
  let [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const countSize = (size: any) => {
    switch (size) {
      case 'small': return '1-4人';
      case 'middle': return '4-8人';
      case 'large': return '>8人'
    }
  }
  const columns = [
    {
      title: '桌号',
      dataIndex: '_id',
      align: 'center'
    },
    {
      title: '容纳人数',
      dataIndex: 'size',
      align: 'center',
      render: (text) => (countSize(text))
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => (
        text ? <Tag color="blue">用餐中</Tag> : <Tag color="green">空闲</Tag>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <Space>
          <Button type="primary" size="small" onClick={() => handleEdit(record._id)}>编辑</Button>
          <Popconfirm
            title="你确定要删除这个餐桌吗?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small">删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]


  const fetchData = () => {
    setTableLoading(true);
    fetchMealTable().then(res => {
      res.sort((a, b) => (
        parseInt(a._id) - parseInt(b._id)
      ))
      setMealTableList(res);
      setTableLoading(false)
    })
  }

  const handleAddTable = () => {
    setIsEdit(false);
    setIsModalVisible(true)
    form.resetFields();
  }

  const handleEdit = (id: any) => {
    MealTableDetail(id).then(res => {
      setMealTableDetail(res);
      form.setFieldsValue({ ...res })
    })
    setIsModalVisible(true)
    setIsEdit(true);
  }


  const handleDelete = (id: any) => {
    deleteMealTable(id).then(res => {
      fetchData();
      message.success("删除餐桌成功")
    })
  }

  const handleSubmit = () => {
    form.validateFields().then(value => {
      if (isEdit) {
        const data = {
          _id: mealTableDetail['_id'],
          ...value
        }
        updateMealTable(data).then(res => {
          message.success("更新餐桌成功");
          fetchData();
        })
      } else {
        addMealTable(value).then(res => {
          message.success("添加餐桌成功");
          fetchData();
        })
      }
      form.resetFields()
      setIsModalVisible(false)
      setIsEdit(false)
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEdit(false)
    form.resetFields()
  }

  return (
    <Card>
      <Button style={{ float: 'right', marginBottom: '15px' }} type="primary" onClick={handleAddTable}>新增</Button>
      <Table
        bordered
        rowKey="_id"
        dataSource={mealTableList}
        columns={columns}
        loading={tableLoading}
        size="small"
      />
      <Modal width={400} title={isEdit ? '编辑餐桌' : '添加餐桌'} visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
        <Form
          {...layout}
          form={form}
          style={{ width: 350, margin: '0 auto' }}
          initialValues={{
            status: false,
            size: 'small'
          }}
        >
          <Form.Item
            label="桌号"
            name="_id"
            rules={[{ required: true, message: '请输入桌号!' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="餐桌大小"
            name="size"
            rules={[{ required: true, message: '请输入餐桌大小!' }]}
          >
            <Radio.Group>
              <Radio value="small">small</Radio>
              <Radio value="middle">middle</Radio>
              <Radio value="large">large</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="餐桌状态"
            name="status"
            rules={[{ required: true, message: '请输入餐桌状态!' }]}
          >
            <Radio.Group>
              <Radio value={true}>用餐中</Radio>
              <Radio value={false}>空闲</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </Card>

  );
};