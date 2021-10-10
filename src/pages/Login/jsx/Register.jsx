import React from 'react';
import {Input, Button, Form, Typography, message} from 'antd';
import '../css/Register.css';
import qlogo from './qlogo.png';

const {Title} = Typography;

class Register extends React.Component {
    onFinish = (values) => {
        const params = {
            "user": values.username,
            "pwd": values.password,
            "verification": values.check
        };
        fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                if (res.code === 1) {
                    message.success("注册成功！")
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 1500)
                } else {
                    message.error("用户名已存在！")
                }
            })
    }

    render() {
        return (
            <div className='login-background'>
                
                <Form labelAlign='right'
                    name="normal_register"
                    className="register-form"
                    onFinish={this.onFinish}>
                         <img className={"login_title"} src={qlogo} alt={"logo"}/>
                    <Form.Item
                        name="username"
                        label={"用户名"}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || (getFieldValue('username').length <= 10)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('用户名长度最多为10'));
                                },
                            }),
                        ]}>
                         <Input placeholder="用户名最长为10位" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={"密码"}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || (getFieldValue('password').length >= 4 && getFieldValue('password').length <= 16)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码长度应为4-16位！'));
                                },
                            }),
                        ]}>
                        <Input.Password placeholder='请设置密码'/>
                    </Form.Item>
                    <Form.Item
                        name="repassword"
                        label={"确认密码"}
                        rules={[
                            {
                                required: true,
                                message: '请确认密码！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不一致！'));
                                },
                            }),
                        ]}>
                        <Input.Password placeholder='请确认密码'/>
                    </Form.Item>
                    <Form.Item
                        name="check"
                        label={"密码凭证"}
                        rules={[
                            {
                                required: true,
                                message: '请输入4位数字！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('check').length === 4) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请输入4位数字！'));
                                },
                            }),
                        ]}>
                        <Input placeholder='请输入4位数字作为找回密码凭证'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size='large' className="register-form-button">注册</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Register