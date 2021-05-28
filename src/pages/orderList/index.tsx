import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card, message, Modal } from 'antd';
import moment from 'moment'
import { fetchOrderList, confirmPayMoney, OrderDetail } from '@/services/orderList'
import './index.less';
import { updateMealTable, MealTableDetail } from '@/services/MealTable';

function OrderList() {
  let [tableLoading, setTableLoading] = useState(false)
  let [orderList, setOrderList] = useState([])
  let [orderDetail, setOrderDetail] = useState({})
  let [number, setNumber] = useState(0)
  let [isModalVisible, setIsModelVisible] = useState(false)
  let [dishList, setDishList] = useState([])


  useEffect(() => {
    setTableLoading(true)
    fetchOrderList().then(res => {
      setOrderList(res)
      setTableLoading(false)
    })
  }, [number])

  const handlePayMoney = (record: object) => {
    let orderInfo = {
      ...record,
      status: true
    }
    confirmPayMoney(orderInfo).then(res => {
      setNumber(++number)
      MealTableDetail(res.tableId).then(res => {
        res.status = false;
        updateMealTable(res).then(res => {
          message.success("结账成功");
        })
      })
    })
  }

  const handleOrderDetail = (id: any) => {
    OrderDetail(id).then(res => {
      setOrderDetail(res);
      console.log(res.dishAll);
      setDishList(res.dishAll);
      setIsModelVisible(true);
    })
  }

  const handleOk = () => {
    setIsModelVisible(false)
  }
  const handleCancel = () => {
    setIsModelVisible(false)
  }

  const columns = [
    {
      title: '订单号',
      dataIndex: '_id',
      width: 100,
      align: 'center'
    },
    {
      title: '餐桌号',
      dataIndex: 'tableId',
      width: 100,
      align: 'center'
    },
    {
      title: '用餐人数',
      dataIndex: 'personNum',
      width: 100,
      align: 'center'
    },
    {
      title: '总金额',
      dataIndex: 'totalPrice',
      width: 100,
      align: 'center',
      render: (text) => <span>¥{text}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      render: (text: boolean) => {
        return text ? <Tag color="green">已结账</Tag> : <Tag color="blue">用餐中</Tag>
      }
    },
    {
      title: '员工',
      dataIndex: 'username',
      width: 120,
      align: 'center',
      render: (text: boolean) => text ? text : 'user'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 200,
      align: 'center',
      render: (text: any) => text ? <span>{moment(text).format('lll')}</span> : ''
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => {
        return <Space>
          <Button size="small" onClick={() => handleOrderDetail(record._id)}>详情</Button>
          <Popconfirm title="确认完成付款吗？" okText="确认" cancelText="取消"
            onConfirm={() => handlePayMoney(record)} disabled={record.status}>
            <Button type="primary" size="small"
              disabled={record.status}>结账</Button>
          </Popconfirm>
        </Space>
      }
    },
  ]

  const columns2 = [
    {
      title: '菜品名称',
      dataIndex: 'dishName',
      width: 100,
      align: 'center'
    },
    {
      title: '菜品价格',
      dataIndex: 'price',
      width: 100,
      align: 'center'
    },
    {
      title: '菜品数量',
      dataIndex: 'count',
      width: 100,
      align: 'center'
    },
  ]

  return (
    <Card className="orderListStyle">
      <Table
        bordered
        rowKey="_id"
        dataSource={orderList}
        columns={columns}
        loading={tableLoading}
        size="small"
      />
      <Modal title="订单详情" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Table
          bordered
          rowKey="_id"
          dataSource={dishList}
          columns={columns2}
          size="small"
        />
      </Modal>
    </Card>
  );
}

export default OrderList;
