jQuery ->
  if $('#my-units').size() > 0
    $(window).on 'scroll', -> more_units_url = $('.pagination .next_page a').attr('href')
    if more_pages_url && $(window).scrollTop() > $(document).height() - $(window).height() - 60
            $('.pagination').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..." />')
            $.getScript more_pages_url
    return
  return