'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  console.log('asdf');
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/blogs').get(todoList.list_all_tasks).post(todoList.create_a_task);

  app.route('/blogs/:blogId').get(todoList.read_a_task).put(todoList.update_a_task).delete(todoList.delete_a_task);
};

;