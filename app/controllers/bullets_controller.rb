class BulletsController < ApplicationController
def create
		@chapter = Chapter.find(params[:chapter_id])
		@bullet = @chapter.bullets.create(bullet_params)
		
		redirect_to chapter_path(@chapter)
	end
	
	def show
		@bullet = Bullet.find(params[:id])
	end
	
	def destroy
		@chapter = Chapter.find(params[:chapter_id])
		@bullet = @chapter.bullets.find(params[:id])
		@bullet.destroy
		
		redirect_to chapter_path(@chapter)
	end
	
	private
	def bullet_params
		params.require(:bullet).permit(:content)
	end
end
