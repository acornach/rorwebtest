class Chapter < ActiveRecord::Base
  belongs_to :unit
  has_many :bullets
  validates :title, presence: true, length: {minimum: 3}
end
