import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import { SmileOutlined } from '@ant-design/icons';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <Card>
      {/* <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: '更快更强的重型组件，已经发布。',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        /> */}
      <h1 style={{ fontSize: '25px', letterSpacing: '1px', fontWeight: '600', textAlign: 'center' }}>欢迎登录点餐管理系统</h1>
      <div style={{ width: 500, margin: '0 auto' }}>
        <Alert
          icon={<SmileOutlined />}
          message="温馨提示"
          description="请先选择餐桌在点餐，点完后在购物车中下单"
          type="success"
          showIcon
        />
      </div>

    </Card>
  );
};
