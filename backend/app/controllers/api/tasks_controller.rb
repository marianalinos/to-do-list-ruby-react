class Api::TasksController < ApplicationController
  before_action :set_todo
  before_action :set_task, only: [ :show, :update, :destroy ]

  def index
    tasks = @todo.tasks
    tasks = tasks.where(task_status: params[:status]) if params[:status].present?
    render json: tasks.as_json(only: [ :id, :task_title, :task_status ])
  end

  def show
    render json: @task.as_json(only: [ :id, :task_title, :task_status ])
  end

  def create
    task = @todo.tasks.build(task_params)
    if task.save
      render json: task.as_json(only: [ :id, :task_title, :task_status ]), status: :created
    else
      render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task.as_json(only: [ :id, :task_title, :task_status ])
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_todo
    @todo = Todo.find(params[:todo_id])
  end

  def set_task
    @task = @todo.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:task_title, :task_status)
  end
end
