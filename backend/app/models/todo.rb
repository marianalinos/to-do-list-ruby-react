class Todo < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :todo_title, presence: true, length: { minimum: 1, maximum: 255 }
end
