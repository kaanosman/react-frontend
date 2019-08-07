import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

import 'antd/dist/antd.css'
import Login from "./components/login";
import Registration from "./components/register";
import TodoList from "./components/todoLists";
import TodoItem from "./components/todoItems";
import AddTodoItem from "./components/addTodoItem";
import AddTodoList from "./components/addTodoList";

ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/todo-lists" component={TodoList} />
        <Route exact path="/todo-items" component={TodoItem} />
        <Route exact path="/add-todo-item" component={AddTodoItem} />
        <Route exact path="/add-todo-list" component={AddTodoList} />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
