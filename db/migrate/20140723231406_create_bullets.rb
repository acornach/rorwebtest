class CreateBullets < ActiveRecord::Migration
  def change
    create_table :bullets do |t|
      t.string :content
      t.references :chapter, index: true

      t.timestamps
    end
  end
end
