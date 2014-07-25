class ChaptersController < ApplicationController
	def create
		@unit = Unit.find(params[:unit_id])
		@chapter = @unit.chapters.create(chapter_params)
		
		redirect_to unit_path(@unit)
	end
	
	def show
		@chapter = Chapter.find(params[:id])
	end
	
	def index
		@chapters = Chapter.all
	end
	
	def destroy
		@unit = Unit.find(params[:unit_id])
		@chapter = @unit.chapters.find(params[:id])
		@chapter.destroy
		
		redirect_to unit_path(@unit)
	end
	
	private
	def chapter_params
		params.require(:chapter).permit(:title)
	end
end
