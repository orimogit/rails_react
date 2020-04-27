import React from 'react';
import Header from './header';
import TaskForm from './task-form';
import TaskTable from './task-table';

class App extends React.Component {
  constructor(props) {
    super(props);

    // 初期値
    this.state = {
      tasks: [],
    }

    // タスク取得メソッドをthisにbind
    this.getTasks = this.getTasks.bind(this);
  }

  // コンポーネントマウント時にタスク一覧を取得
  componentDidMount() {
    this.getTasks()
  }

  getTasks() {
    // Rails側の/api/v1/tasksにGETリクエストを送ってタスク一覧を取得
    let request = new Request('/api/v1/tasks', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request).then(function (response) {
      return response.json();
    }).then(function (tasks) {
      this.setState({
        tasks: tasks
      });
    }.bind(this)).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <Header title='Rails 5.1 + webpacker + React + Reactstrap Example' />
        <div>
          <TaskForm getTasks={this.getTasks} />
          <TaskTable tasks={tasks} getTasks={this.getTasks} />
        </div>
      </div>
    )
  }
}

export default App;