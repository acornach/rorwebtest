class Bullet < ActiveRecord::Base
  belongs_to :chapter
  validates :content, presence: true,
                    length: { minimum: 5 }
end
