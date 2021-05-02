import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Row, Col } from 'antd';

export default (): React.ReactNode => {
  // const [form] = Form.useForm()
  // const [tableList, setTableList] = useState([]);
  // const [tableLoading, setTableLoading] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [dishDetail, setDishDetail] = useState({});
  // const [isEdit, setIsEdit] = useState(false);

  const columns = [
    {
      title: '桌号',
      dataIndex: 'tableNum',
      width: 100
    },
    {
      title: '容纳人数',
      dataIndex: 'size'
    },
    // {
    //   title: '状态',
    //   dataIndex: '',
    //   width: 100
    // },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100
    }
  ]

  const mealTableList = [
    {
      tableId: 1,
      size: 'small',
    },
    {
      tableId: 2,
      size: 'small',
    },
    {
      tableId: 3,
      size: 'small',
    },
    {
      tableId: 4,
      size: 'small',
    }
  ]

  return (
    <Card>
      {/* <Table
        bordered
        rowKey="_id"
        dataSource={tableList}
        columns={columns}
        loading={tableLoading}
        size="small"
      /> */}
      <Row gutter={16}>
        {mealTableList.map(item => (
          <Col span={6} key={item.tableId}>
            <Card>
              {item.size}
            </Card>
          </Col>
        ))}
      </Row>
    </Card>

  );
};
