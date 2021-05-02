import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Button, Space, Tag, Input, Modal, message } from 'antd';
import { addMealTable, fetchMealTable, updateMealTable } from '@/services/MealTable';

export default (): React.ReactNode => {
  let [form] = Form.useForm()
  let [mealTableList, setMealTableList] = useState([]);
  // const [tableLoading, setTableLoading] = useState(false);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [mealTableDetail, setMealTableDetail] = useState({});
  let [isEdit, setIsEdit] = useState(false);
  let [number,setNumber] = useState(0)

  const countSize = (size: any) => {
    switch (size) {
      case 'small': return '1-2人';
      case 'middle': return '3-4人';
      case 'large': return '4-8人'
    }
  }
  const columns = [
    {
      title: '桌号',
      dataIndex: 'tableId',
    },
    {
      title: '容纳人数',
      dataIndex: 'size',
      render: (text) => (countSize(text))
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text) => (
        text ? <Tag>用餐中</Tag> : <Tag>空闲</Tag>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <Space>
          <Button type="primary" size="small">修改</Button>
          <Button type="primary" danger size="small">删除</Button>
        </Space>
      )
    }
  ]

  useEffect(() => {

    fetchMealTable().then(res => {
      setMealTableList(res)
    })
  }, [])

  const handleAddTable = () => {
    let obj = {

    }
    addMealTable(obj).then(res => {

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
          message.success("更新菜品成功")
        })
      } else {
        addMealTable(value).then(res => {
          message.success("添加菜品成功")
        })
      }
      form.resetFields()
      setNumber(number + 1)
    })
    setIsModalVisible(false)
  }

  return (
    <Card>
      <Button style={{ float: 'right', marginBottom: '15px' }} type="primary" onClick={handleAddTable}>新增</Button>
      <Table
        bordered
        rowKey="_id"
        dataSource={mealTableList}
        columns={columns}
        // loading={tableLoading}
        size="small"
      />
      <Modal title={isEdit ? '编辑菜品' : '添加菜品'} visible={isModalVisible} onOk={handleSubmit} onCancel={() => setIsModalVisible(false)}>
        <Form
          // {...layout}
          form={form}
          style={{ width: 350, margin: '0 auto' }}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="桌号"
            name="dishName"
            rules={[{ required: true, message: '请输入桌号!' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="容纳人数"
            name="size"
            rules={[{ required: true, message: '请输入容纳人数' }]}
          >
            <Input allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </Card>

  );
};