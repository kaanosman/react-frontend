import React from "react";
import {Table, Button, Divider, Switch, Popconfirm} from 'antd';
import axios from 'axios';
import moment from "moment";


class TodoItem extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };
    constructor(props) {
        super(props);
        const { data } = this.props.location;

        axios.get('http://localhost:8080/todoItem/')
            .then((response) => {
                this.setState({ data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    handleDeleteItem = key => {
        axios.delete('http://localhost:8080/todoItem/' + key)
            .then((response) => {
                const dataSource = this.state.data;
                this.setState({ data: dataSource.filter(item => item.id !== key) });
                console.log(this.state.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleAddItem = key => {
        this.props.history.push('/add-todo-item');
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (value, record) => (
                    <Switch defaultChecked={record.status} />
                ),
                filters: [{ text: 'Completed', value: true }, { text: 'Not Completed', value: false }],
                filteredValue: filteredInfo.status || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.status - b.status,
                sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
            },
            {
                title: 'Deadline',
                dataIndex: 'deadline',
                key: 'deadline',
                filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => moment(a.deadline).unix() - moment(b.deadline).unix(),
                sortOrder: sortedInfo.columnKey === 'deadline' && sortedInfo.order,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                key: 'operation',
                render: (value, record) => (
                  <span>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteItem(record.id)}>
                        <a href="/todo-items">Delete</a>
                    </Popconfirm>
                  </span>
                ),
            },
        ];
        return (
            <div>
                <h1 style={{ textAlign: "center" }}> Todo Items </h1>


                <div className="table-operations">
                    <Button onClick={this.clearFilters}>Clear filters</Button>
                    <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                    <Button onClick={this.handleAddItem} type="primary" >Add Todo List</Button>
                </div>
                <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
            </div>
        );
    }
}

export default TodoItem;