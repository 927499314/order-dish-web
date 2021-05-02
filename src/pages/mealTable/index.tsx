import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Button } from 'antd';
import { history } from 'umi';
// import { fetchDishList } from '@/services/dishList'
import './index.less';

const { Meta } = Card;

const mealTableList = [
    {
        tableId: 1,
        tableSize: 'small',
        status: 0
    },
    {
        tableId: 2,
        tableSize: 'small',
        status: 0
    },
    {
        tableId: 3,
        tableSize: 'small',
        status: 1
    },
    {
        tableId: 4,
        tableSize: 'middle',
        status: 1
    },
    {
        tableId: 5,
        tableSize: 'middle',
        status: 0
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

    const handleOrder = (id: any) => {
        history.push({
            pathname: '/dishList',
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
                            <Card size="small" hoverable className="mealTableCard" style={{ width: 180, height: 180 }} >
                                <div style={{ fontSize: 20 }}>餐桌号：{item.tableId}</div>
                                <div>{countSize(item.tableSize)}</div>
                                {item.status === 1 ? <div style={{ fontSize: 16 }}>用餐中</div> : <Button onClick={() => handleOrder(item.tableId)}>点餐</Button>}

                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}
