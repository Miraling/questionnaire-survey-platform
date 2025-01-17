import React from 'react';
import '../css/Login.css';
import {Form, Input, Button, Typography, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import qlogo from './qlogo.png';


const {Title} = Typography;

class Login extends React.Component {
    onFinish = (values) => {
        const params = {
            "user": values.username,
            "pwd": values.password,
        };
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                if (res.code === 1) {
                    message.success("登录成功！")
                    setTimeout(() => {
                        this.props.history.push('/showallquestionnaire?username=' + values.username)
                    }, 1500)
                } else if (res.code === 0) {
                    message.error("用户不存在，请重新输入！")
                } else {
                    message.error("密码不正确，请重新输入！")
                }
            })
    }

    render() {
        return (
            <div className='login-background'>
                
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}>
                        <img className={"login_title"} src={qlogo} alt={"logo"}/>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名" size='large'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                        size='large'>
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="密码"
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link to ="/register"><strong>现在注册！</strong></Link>
                        <Link to="/resetpassword" >忘记密码</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size='large' className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login