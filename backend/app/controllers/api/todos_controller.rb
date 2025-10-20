class Api::TodosController < ApplicationController
  before_action :set_todo, only: [ :show, :update, :destroy ]

  def index
    todos = Todo.all.includes(:tasks)
    render json: todos.as_json(include: { tasks: { only: [ :id, :task_title, :task_status ] } }, only: [ :id, :todo_title ])
  end

  def show
    render json: @todo.as_json(include: { tasks: { only: [ :id, :task_title, :task_status ] } }, only: [ :id, :todo_title ])
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo.as_json(only: [ :id, :todo_title ]), status: :created
    else
      render json: { errors: todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo.as_json(only: [ :id, :todo_title ])
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy
    head :no_content
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:todo_title)
  end
end
