import React, {Component} from 'react';
import {Input, Button, Form, Typography, message} from 'antd';
import '../css/ResetPassword.css';
import qlogo from './qlogo.png';
const {Title} = Typography;

class ResetPassword extends Component {
    onFinish = (values) => {
        const params = {
            "user": values.username,
            "verification": values.check,
            "newPwd": values.password
        };
        fetch('/api/forgetPwd', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                if (res.code === 1) {
                    message.success("密码重置成功！")
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 1500)
                } else if (res.code === 0) {
                    message.error("用户不存在，请重新输入！")
                } else {
                    message.error("验证不正确，请重新输入！")
                }
            })
    }

    render() {
        return (
            <div className='reset-background'>
             
                <Form 
                    name="normal_reset"
                    className="reset-form"
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
                        <Input placeholder='请输入用户名' size='large'/>
                    </Form.Item>
                    <Form.Item
                        name="check"
                        label={"密码凭证"}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码凭证！',
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
                        <Input placeholder='请输入注册时设置的密码凭证' size='large'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={"输入密码"}
                        rules={[
                            {
                                required: true,
                                message: '输入新密码！',
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
                        <Input.Password placeholder='请设置新密码' size='large'/>
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
                        <Input.Password placeholder='请确认新密码' size='large'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="reset-form-button" size='large'>重置密码</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


export default ResetPassword