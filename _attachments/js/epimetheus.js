$(document).ready(function() {
  $("#search_form").bind("submit", function() {
    var url = $("#search_form")[0].action 
                + "?" + $("#search_form").serialize();
    $.getJSON(url, 
      function(data) {
        $("#search_results").html(new jsontemplate.Template(
          ["{.repeated section rows}",
           "  <div>",
           "    {fields.timestamp} - {fields.default}",
           "  </div>",
           "{.end}"].join("\n")
        ).expand(data));
      });
    return false;
  });
});
