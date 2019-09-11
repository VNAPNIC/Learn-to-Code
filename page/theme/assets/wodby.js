// $(function() {
//     console.log("adsf");
// })(jQuery);

$(document).ready(function() {
    $("label").filter(function() {
        return $(this).text().trim() === "Drupal";
    }).parent('li').css({
        'margin-top': '20px',
        'border-top': '1px dotted',
        'padding-top': '20px'
    });
});

