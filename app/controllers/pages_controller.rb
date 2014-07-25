require 'will_paginate/array'
class PagesController < ApplicationController

  def home
	@units = Unit.all
  end

  def testview
	#@pages = Unit.all.paginate(page: params[:page], per_page: 2).order('created_at DESC')
	#@units = Unit.paginate(:page => params[:page], :per_page => 2)
	@units = Chapter.paginate(:page => params[:page], :per_page => 5)
	respond_to do |format|
		format.html
		format.js
	end
  end
end
