import { Form, Input, Button, Card } from 'antd-mobile';
import styles from './style.module.scss';

const data = {
  payment: 1500,
  title: '小谷围社区',
  time: '2022.5.1',
};

const FormPage = () => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
  };

  return (
    <div className={styles.form}>
      <Card title={data.title}>
        <p>疫苗费用：{data.payment}</p>
        <p>接种时间：{data.time}</p>
      </Card>
      <Form
        layout='horizontal'
        footer={
          <Button block color='primary' size='large' onClick={onSubmit}>
            提交
          </Button>
        }
        form={form}
        initialValues={{
          name: '',
          phone: '',
          id: '',
        }}
      >
        <Form.Header>请填写您的个人信息</Form.Header>
        <Form.Item name='name' label='姓名' rules={[{ required: true }]}>
          <Input placeholder='请输入您的姓名' />
        </Form.Item>
        <Form.Item name='phone' label='联系方式' rules={[{ required: true }]}>
          <Input placeholder='请输入您的联系方式' />
        </Form.Item>
        <Form.Item name='id' label='身份证号' rules={[{ required: true }]}>
          <Input placeholder='请输入您的身份证号' />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPage;
