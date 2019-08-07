import React from "react";
import { Form, Icon, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

class NormalLoginForm extends React.Component {

    state = {redirect: false};

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let postdata = new URLSearchParams();
                postdata.append('name', values.username);
                postdata.append('password', values.password);
                axios.post('http://localhost:8080/user/login', postdata)
                    .then((response) => {
                        localStorage.setItem('user' , response.data);
                        localStorage.setItem('name' , values.username);
                        this.setState({ redirect: true })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/todo-lists'/>;
        }
        return (
            <div className="align">
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to= "/register">Register</Link>

                </Form.Item>
            </Form>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;
