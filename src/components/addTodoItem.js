import React from 'react';
import { Form, Input, Button, Switch, DatePicker, Select } from 'antd';
import { Redirect } from 'react-router-dom';

class AddTodoItemForm extends React.Component {

    state = {redirect: false};

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                //todo
            }
        });
    };

    render() {
        const { Option } = Select;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/todo-lists'/>;
        }
        return (
            <div className="align-big">
                <h1 style={{ textAlign: "center" }}>Add Todo Item</h1>
                <Form {...formItemLayout}  onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your todo name!' }],
                        })(
                            <Input/>,
                        )}
                    </Form.Item>
                    <Form.Item  label="Description">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: 'Please input your todo description!' }],
                        })(
                            <Input/>,
                        )}
                    </Form.Item>
                    <Form.Item label="Status">
                        {getFieldDecorator('status', {
                            rules: [{ required: true, message: 'Please input your todo status!' }],
                        })(
                            <Switch/>
                        )}
                    </Form.Item>
                    <Form.Item label="Deadline">
                        {getFieldDecorator('deadline', {
                            rules: [{ required: true, message: 'Please input your todo deadline!' }],
                        })(
                            <DatePicker/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="alignment">
                            Add Todo Item
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const AddTodoItem = Form.create({ name: 'add_todo_item' })(AddTodoItemForm);

export default AddTodoItem;
