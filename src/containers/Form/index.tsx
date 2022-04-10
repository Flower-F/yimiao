import { Form, Input, Button, Card, SpinLoading } from 'antd-mobile';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../request';
import { getParams } from '../../request/getParams';
import styles from './style.module.scss';

interface IInfo {
  payment: string;
  title: string;
  time: string;
}

const FormPage = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState<IInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = () => {
    const values = form.getFieldsValue();
    // console.log(values);
    navigate(
      `/success?name=${values.name}&phone=${values.phone}&id=${values.id}&vaccineID=${params.vaccineID}`
    );
  };

  const params = useMemo(() => getParams(), []);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/getVacDlc?vaccineID=${params.vaccineID}`)
      .then((res) => {
        // console.log(res);
        const data = res.data;
        if (data && data.code === 200) {
          setInfo({
            payment: data.vacInfo.vacCost,
            title: data.vacInfo.vacName,
            time: data.vacInfo.vacTime,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  if (loading) {
    return (
      <div className={styles.dot}>
        <SpinLoading color='default' />
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <Card title={info?.title}>
        <p>疫苗费用：{info?.payment}</p>
        <p>接种时间：{info?.time}</p>
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
