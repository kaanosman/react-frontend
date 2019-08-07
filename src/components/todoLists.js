import React from "react";
import { Table, Popconfirm, Form, Button } from 'antd';
import axios from "axios";
import {Link} from "react-router-dom";


const EditableContext = React.createContext();

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        const data = [];
        localStorage.removeItem('todoList');
        this.state = { data, editingKey: '' };
        axios.get('http://localhost:8080/user/' + localStorage.getItem('user') + '/todoList')
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '50%',
                editable: true,
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <a href="/todo-lists">Delete</a>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: 'Show Items',
                dataIndex: 'show items',
                render: (text, record) =>
                    <Link to={{
                            pathname: "/todo-items",
                            data: record.id
                        }}
                    >Show Items</Link>
            },
        ];
    }

    handleDelete = key => {
        axios.delete('http://localhost:8080/todoList/' + key)
            .then((response) => {
                const dataSource = this.state.data;
                this.setState({ data: dataSource.filter(item => item.id !== key) });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleAdd = key => {
        this.props.history.push('/add-todo-list');
    };

    handleClick = key => {
        console.log(key);
        localStorage.setItem('todoList' , key);
    };

    render() {
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <h1 style={{ textAlign: "center" }}> Todo List </h1>
                <div>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginLeft: 130, marginBottom: 10 }}>
                        Add Todo List
                    </Button>


                    <Table
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                </div>
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;