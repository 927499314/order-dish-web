import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image } from 'antd';
import { history } from 'umi';
// import { fetchDishList } from '@/services/dishList'
import './index.less';

const { Meta } = Card;

const mealTableList = [
    {
        tableId: 1,
        tableSize: 'small'
    },
    {
        tableId: 2,
        tableSize: 'small'
    },
    {
        tableId: 3,
        tableSize: 'small'
    },
    {
        tableId: 4,
        tableSize: 'middle'
    },
    {
        tableId: 5,
        tableSize: 'middle'
    }
]

const countSize = (size: any) => {
    switch (size) {
        case 'small': return '1-2人';
        case 'middle': return '3-4人';
        case 'large': return '4-8人'
    }
}

export default function MealTable() {

    const handleTableDetails = (id) => {
        console.log(id);
        history.push({
            pathname: '/mealTable/orderDetail',
            query: {
                id
            }
        })
    }

    return (
        <div className='mealTableStyle'>
            <Row>
                {
                    mealTableList.map(item => (
                        <Col span={6} key={item.tableId}>
                            <Card size="small" hoverable className="mealTableCard" style={{ width: 200, height: 200 }} onClick={() => handleTableDetails(item.tableId)}>
                                <div style={{ fontSize: 20 }}>餐桌号：{item.tableId}</div>
                                <div>{countSize(item.tableSize)}</div>
                                <div style={{ fontSize: 16 }}>用餐中</div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}
