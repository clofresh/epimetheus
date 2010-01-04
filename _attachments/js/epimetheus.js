$(document).ready(function() {
  $("#search_form").bind("submit", function() {
    var url = $("#search_form")[0].action 
                + "?" + $("#search_form").serialize();
    $.getJSON(url, 
      function(data) {
        
        $("#search_results_metadata").html(new jsontemplate.Template(
          "Results {from} - {to} of {total_rows} ({duration} seconds)"
        ).expand({
          from:       data.skip + 1,
          to:         Math.min(data.skip + data.limit, data.total_rows),
          total_rows: data.total_rows,
          duration:   ((data.search_duration 
                          + data.fetch_duration) / 1000).toFixed(3)
        }));
        
        $("#search_results").html(new jsontemplate.Template(
          ["{.repeated section rows}",
           "  <div>",
           "    {fields.timestamp} - {fields.default}",
           "  </div>",
           "{.end}"].join("\n")
        ).expand(data));
        
        var num_pages = Math.ceil(data.total_rows / data.limit);
        var current_page = parseInt(data.skip / data.limit) + 1;
        
        $("#search_pager").html(
          _(_.range(num_pages)).map(function(i) {
              var page_num = i + 1;

              if (page_num == current_page) {
                return page_num;

              } else {
                var lambda = ["return function() {",
                                "$('#search_form')[0].skip.value = ",
                                i,
                                " * $('#search_form')[0].limit.value; ",
                                "$('#search_form').trigger('submit');",
                                "return false;",
                              "}()"].join("");

                return '<a href="#" class="pager_link" onclick="' + lambda + '">' + page_num + '</a>';
              }
          }).join(" | ")
        );
        
      });
    return false;
  });
});
