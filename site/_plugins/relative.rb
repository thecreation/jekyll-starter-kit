module Jekyll
  module RelativeFilter
    def relative(input)
      page = @context.registers[:page]

      url_depth = page["url"].scan("/").length

      if url_depth <= 1
        prefix = '.'
      elsif url_depth == 2
        prefix = '..'
      else
        prefix = '..'
        for i in (3..url_depth)
          prefix += '/..'
        end
      end

      return prefix + input
    end
  end
end

Liquid::Template.register_filter(Jekyll::RelativeFilter)
