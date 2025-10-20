class Task < ApplicationRecord
  belongs_to :todo

  validates :task_title, presence: true, length: { minimum: 1, maximum: 255 }
  validates :task_status, presence: true, inclusion: { in: %w[pending done] }
end
