require "test_helper"

class Api::TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @todo = Todo.create!(todo_title: "Test Todo")
  end

  test "should create task" do
    assert_difference("Task.count") do
      post api_todo_tasks_url(@todo), params: { task: { task_title: "Test Task", task_status: "pending" } }, as: :json
    end
    assert_response :created
  end

  test "should show task" do
    task = @todo.tasks.create!(task_title: "Test Task", task_status: "pending")
    get api_todo_task_url(@todo, task)
    assert_response :success
  end

  test "should update task" do
    task = @todo.tasks.create!(task_title: "Test Task", task_status: "pending")
    patch api_todo_task_url(@todo, task), params: { task: { task_title: "Updated Task", task_status: "done" } }, as: :json
    assert_response :success
    task.reload
    assert_equal "Updated Task", task.task_title
    assert_equal "done", task.task_status
  end

  test "should destroy task" do
    task = @todo.tasks.create!(task_title: "Test Task", task_status: "pending")
    assert_difference("Task.count", -1) do
      delete api_todo_task_url(@todo, task)
    end
    assert_response :no_content
  end
end
