import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Radio, InputNumber, message, Tag, Popconfirm } from 'antd';
import { fetchDishList, addDish, deleteDish, updateDish, fetchDishDetail } from '@/services/dishManage'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default (): React.ReactNode => {

  const [form] = Form.useForm()
  const [dishList, setDishList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dishDetail, setDishDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 5, total: 0 })
  const [number, setNumber] = useState(0)


  const columns = [
    {
      title: "#",
      dataIndex: 'index',
      align: 'center',
      width: 80
    },
    {
      title: "菜品名",
      dataIndex: 'dishName',
      align: 'center'
    },
    {
      title: "图片",
      dataIndex: 'imgUrl',
      align: 'center',
      render: (text: string) => <img src={text} width="60" alt="菜品图片" />
    },
    {
      title: "价格",
      dataIndex: 'price',
      align: 'center',
      render: (text: number) => <span>￥{text}</span>
    },
    {
      title: "状态",
      dataIndex: 'status',
      align: 'center',
      render: (text: boolean) => text ? <Tag color="green">上架</Tag> : <Tag color="">下架</Tag>
    },
    {
      title: "操作",
      dataIndex: 'action',
      align: 'center',
      render: (text: any, record: any) => (
        <Space>
          <Button type="primary" size="small" onClick={() => handleDishDetail(record._id)}>编辑</Button>
          <Popconfirm
            title="你确定要删除这个菜品吗?"
            onConfirm={() => handleDeleteDish(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small">删除</Button>
          </Popconfirm>
        </Space>
      )
    },
  ]

  // 处理添加菜品按钮
  const handleAddDish = () => {
    setIsEdit(false);
    setIsModalVisible(true);
    form.resetFields();
  }

  // 删除菜品
  const handleDeleteDish = (id: any) => {
    deleteDish(id).then(res => {
      message.success("删除菜品成功");
      setPagination({ pageNum: 1, pageSize: 5, total: 0 })
      setNumber(number + 1);
    })
  }

  // 获取菜品详情
  const handleDishDetail = (id: any) => {
    setIsEdit(true)
    fetchDishDetail(id).then(res => {
      setDishDetail(res)
      form.setFieldsValue({ ...res })
      setIsModalVisible(true)
    })
  }

  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(value => {
      if (isEdit) {
        const data = {
          _id: dishDetail['_id'],
          ...value
        }
        updateDish(data).then(res => {
          setNumber(number + 1)
          message.success("更新菜品成功")
        })
      } else {
        addDish(value).then(res => {
          setNumber(number + 1)
          message.success("添加菜品成功")
        })
      }
      form.resetFields()
      setIsModalVisible(false);
      setIsEdit(false)
    })
  }

  useEffect(() => {
    setTableLoading(true)
    fetchDishList(pagination).then(res => {
      const { pageNum, pageSize, total, data } = res
      data.map((item: any, index: number) => {
        item.index = (pageNum - 1) * pageSize + index + 1;
      })
      setPagination({ pageNum, pageSize, total })
      setDishList(data)
      setTableLoading(false)
    })
  }, [number])

  return (
    <Card className="dishManageStyle">
      <Button type="primary"
        style={{ float: 'right', marginBottom: '16px' }}
        onClick={handleAddDish}
      >新增</Button>
      <Table
        bordered
        rowKey="_id"
        dataSource={dishList}
        columns={columns}
        loading={tableLoading}
        size="small"
        pagination={{
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20'],
          onChange: (pageNum, pageSize: number) => {
            setPagination({ ...pagination, pageNum, pageSize });
            setNumber(number + 1)
          },
          showTotal: (total) => `共 ${total} 条数据`
        }}
      />
      <Modal title={isEdit ? '编辑菜品' : '添加菜品'} visible={isModalVisible} onOk={handleSubmit} onCancel={() => setIsModalVisible(false)}>
        <Form
          {...layout}
          form={form}
          style={{ width: 350, margin: '0 auto' }}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="菜品名称"
            name="dishName"
            rules={[{ required: true, message: '请输入菜品名称!' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="图片地址"
            name="imgUrl"
            rules={[{ required: true, message: '请输入图片地址!' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Radio.Group name={status}>
              <Radio value={true}>上架</Radio>
              <Radio value={false}>下架</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
