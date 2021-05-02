import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Button } from 'antd';
import { history, connect } from 'umi';
import './index.less';
import { fetchMealTable } from '@/services/MealTable';

// const mealTableList = [
//     {
//         tableId: '01',
//         tableSize: 'small',
//         status: 0
//     },
//     {
//         tableId: '02',
//         tableSize: 'small',
//         status: 0
//     },
//     {
//         tableId: '03',
//         tableSize: 'small',
//         status: 1
//     },
//     {
//         tableId: '04',
//         tableSize: 'middle',
//         status: 1
//     },
//     {
//         tableId: '05',
//         tableSize: 'middle',
//         status: 0
//     }
// ]

function MealTable() {

    let [mealTableList,setMealTableList] = useState([])

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
            console.log(res);
            setMealTableList(res)
        })
    }, [])

    return (
        <div className='mealTableStyle'>
            <Row>
                {
                    mealTableList?.map(item => (
                        <Col span={6} key={item.tableId}>
                            <Card size="small" hoverable className="mealTableCard" style={{ width: 160, height: 160 }} >
                                <div style={{ fontSize: 20, margin: '10px' }}>桌号：{item.tableId}</div>
                                <div>{countSize(item.tableSize)}</div>
                                <div className="tableStatus">
                                    {item.status === 1 ? <div style={{ fontSize: 16 }}>用餐中</div> : <Button type="primary" onClick={() => handleOrder(item.tableId)}>点餐</Button>}
                                </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}


export default MealTable
