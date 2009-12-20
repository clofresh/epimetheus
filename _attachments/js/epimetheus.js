$(document).ready(function() {
  $("#search_form").bind("submit", function() {
    var url = $("#search_form")[0].action 
                + "?" + $("#search_form").serialize();
    $.getJSON(url, 
      function(data) {
        $("#search_results").html("");
        jQuery.each(data.rows, function(i, row) {
          $("#search_results").append(
            '<a name="'+row.id+'" id="'+row.id+'">' 
              + row.fields["default"] + 
            '</a><br />'
          );
        });
      });
    return false;
  });
});

