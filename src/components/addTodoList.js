import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from "axios";
import { Redirect } from 'react-router-dom';

class AddTodoListForm extends React.Component {

    state = {redirect: false};

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let postdata = {
                    name : values.name,
                };
                axios.post('http://localhost:8080/user/' + localStorage.getItem('user') + '/todoList', postdata)
                    .then((response) => {
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
                <h1 style={{ textAlign: "center" }}>Add Todo List</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your todo list name!' }],
                        })(
                            <Input
                                placeholder="name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Todo List
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const AddTodoList = Form.create({ name: 'add_todo_list' })(AddTodoListForm);

export default AddTodoList;
