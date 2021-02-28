import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { history } from 'umi';
import moment from 'moment'
import { fetchOrderList } from '@/services/orderList'
import './index.less';

function OrderList() {
  const [tableLoading, setTableLoading] = useState(false)
  const [orderList, setOrderList] = useState([])


  useEffect(() => {
    fetchOrderList().then(res => {
      // console.log(res);
      if (res.status === 0) {
        setOrderList(res.data)
      }
    })
  }, [])

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderId',
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
      render: (text: number) => {
        switch (text) {
          case 0: return <Tag color="blue">用餐中</Tag>
          case 1: return <Tag color="green">已结账</Tag>
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      width: 200,
      align: 'center',
      render: (text: any) => text ? <span>moment(text).format('YYYY-MM-DD HH:MM:SS')</span> : ''
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => {
        return <Space>
          <Button size="small" >详情</Button>
          <Button type="primary" size="small" disabled={record.status}>结账</Button>
        </Space>
      }
    },
  ]

  return (
    <div className="orderListStyle">
      <Table
        bordered
        rowKey="orderId"
        dataSource={orderList}
        columns={columns}
        loading={tableLoading}
        size="small"
      />
    </div>
  );
}

export default OrderList;
