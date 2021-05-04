import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Button } from 'antd';
import { history, connect } from 'umi';
import './index.less';
import { fetchMealTable } from '@/services/MealTable';

function MealTable() {

    let [mealTableList, setMealTableList] = useState([])

    const countSize = (size: any) => {
        switch (size) {
            case 'small': return '1-2人';
            case 'middle': return '3-4人';
            case 'large': return '4-8人'
        }
    }

    const handleOrder = (id: any) => {
        history.push({
            pathname: '/dishList',
            query: {
                id
            }
        })
    }

    useEffect(() => {
        fetchMealTable().then(res => {
            res.sort((a, b) => (
                parseInt(a._id) - parseInt(b._id)
            ))
            console.log(res);
            setMealTableList(res)
        })
    }, [])

    return (
        <Card className='mealTableStyle'>
            <Row>
                {
                    mealTableList?.map(item => (
                        <Col span={6} key={item._id}>
                            <Card size="small" hoverable className="mealTableCard" style={{ width: 160, height: 160 }} >
                                <div style={{ fontSize: 18, margin: '10px 0 5px 0' }}>桌号：{item._id}</div>
                                <div>{countSize(item.size)}</div>
                                <div className="tableStatus">
                                    {item.status === true ? <div style={{ fontSize: 18 }}>用餐中</div> : <Button type="primary" onClick={() => handleOrder(item._id)}>点餐</Button>}
                                </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Card>
    );
}


export default MealTable
