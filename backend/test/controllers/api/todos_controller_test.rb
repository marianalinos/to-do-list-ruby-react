require "test_helper"

class Api::TodosControllerTest < ActionDispatch::IntegrationTest
  test "should create todo" do
    assert_difference("Todo.count") do
      post api_todos_url, params: { todo: { todo_title: "Test Todo" } }, as: :json
    end
    assert_response :created
  end

  test "should show todo" do
    todo = Todo.create!(todo_title: "Test Todo")
    get api_todo_url(todo)
    assert_response :success
  end

  test "should update todo" do
    todo = Todo.create!(todo_title: "Test Todo")
    patch api_todo_url(todo), params: { todo: { todo_title: "Updated Todo" } }, as: :json
    assert_response :success
    todo.reload
    assert_equal "Updated Todo", todo.todo_title
  end

  test "should destroy todo" do
    todo = Todo.create!(todo_title: "Test Todo")
    assert_difference("Todo.count", -1) do
      delete api_todo_url(todo)
    end
    assert_response :no_content
  end
end
