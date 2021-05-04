import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Button } from 'antd';
import { history, connect } from 'umi';
import { Column } from '@ant-design/charts';
import { fetchOrderList } from '@/services/orderList';
import moment from 'moment';

function ProfitChart() {

    const [data, setDate] = useState([])

    const config = {
        data,
        width: 500,
        height: 400,
        xField: 'date',
        yField: 'totalPrice',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            sate: {
                alias: '日期',
            },
            sales: {
                alias: '销售额',
            },
        },
    };

    let chart;

    useEffect(() => {
        fetchOrderList().then(res => {
            console.log(res);
            let dataObj = {}
            let date;
            res.map(v => {
                date = moment(v.createdAt).format("l");
                if (!dataObj[date]) {
                    dataObj[date] = 0
                }
                dataObj[date] += v.totalPrice
            })
            let dateArr = []
            for (let i in dataObj) {
                dateArr.push({ date: i, totalPrice: dataObj[i] })
            }
            setDate(dateArr)
        })
    }, [])

    return (
        <Card>
            <div style={{ width: 700, margin: '0 auto' }}>
                <Column {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
        </Card>
    );
};

export default ProfitChart
