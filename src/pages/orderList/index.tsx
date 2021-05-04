import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Popconfirm, Card } from 'antd';
import moment from 'moment'
import { fetchOrderList, confirmPayMoney } from '@/services/orderList'
import './index.less';
import { updateMealTable, MealTableDetail } from '@/services/MealTable';

function OrderList() {
  let [tableLoading, setTableLoading] = useState(false)
  let [orderList, setOrderList] = useState([])
  let [number,setNumber] = useState(0)


  useEffect(() => {
    setTableLoading(true)
    fetchOrderList().then(res => {
      console.log(res,'1231');
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
      console.log(res);
      setNumber(++number)
      MealTableDetail(res.tableId).then(res=>{
        res.status = false;
        updateMealTable(res).then(res=>{
            console.log(res,'update');
        })
    })
    })
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
          <Button size="small" >详情</Button>
          <Popconfirm title="确认完成付款吗？" okText="确认" cancelText="取消"
            onConfirm={()=>handlePayMoney(record)} disabled={record.status}>
            <Button type="primary" size="small"
              disabled={record.status}>结账</Button>
          </Popconfirm>
        </Space>
      }
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
    </Card>
  );
}

export default OrderList;
