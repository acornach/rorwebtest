require 'will_paginate/array'
class UnitsController < ApplicationController

	def new
		@unit = Unit.new
	end

	def create
		@unit = Unit.new(unit_params)
		if @unit.save
			redirect_to @unit
		else
			render 'new'
		end
	end
	
	def edit
		@unit = Unit.find(params[:id])
	end
	
	def update
		@unit = Unit.find(params[:id])
		
		if @unit.update(unit_params)
			redirect_to @unit
		else
			render 'edit'
		end
	end
	
	def show
		@unit = Unit.find(params[:id])
		
	end
	
	def index
		@units = Unit.all
	end

	def destroy
		@unit = Unit.find(params[:id])
		@unit.destroy
		
		redirect_to units_path
	end
	
	private
	def unit_params
		params.require(:unit).permit(:title)
	end
end
