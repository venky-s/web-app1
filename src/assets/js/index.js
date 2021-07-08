$(window).resize(function () {

  /****** Sidebar and Cards Height ******/
  setTimeout(function () {
    equalHeight();
  }, 300);

});

$(document).ready(function () {
  /****** Sidebar and Cards Height ******/
  setTimeout(function () {
    equalHeight();
  }, 300);

});

$(window).on('load', function (event) {
  /********* Accordion **********/
  var acc = document.getElementsByClassName("accordion-header");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

});

function is_767px() {

  var screen_size = window.innerWidth;
  var is_md = false;
  screen_size <= 767 ? is_md = true : is_md = false;

  return is_md;

}

function equalHeight() {

  if (!is_767px()) {
    var heightSidebar = $("div.content-body").height();
    $("div.main-menu").height(heightSidebar);
  } 
  else {
  }

}

function changeInput(selection) {

  var theClass = selection.value;
  $('div#option-field > div').show();
  $('div#option-field > div:not(.' + theClass + ')').hide();

}

function formatDate(fullStringDate) {

  var stringDate = fullStringDate.split(' ');
  var dateFrom = new Date(stringDate[0]);
  var dateTo = new Date(stringDate[2]);

  var fullFormatted = "" + getMonthName(dateFrom.getMonth()) + " " + dateFrom.getDate() + " , " + dateFrom.getFullYear() + " - " + "" + getMonthName(dateTo.getMonth()) + " " + dateTo.getDate() + " , " + dateTo.getFullYear();
  return fullFormatted;

}

function getMonthName(month_name) {

  var month = new Array();

  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mac";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  var monthName = month[month_name];

  return monthName;


}

function change_label() {

  var fullStringDate = $("#calendar").val();
  var fullFormatted = formatDate(fullStringDate);
  $("#calendar").val(fullFormatted);

}

function formatNumber(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

$('#file-upload').change(function() {
  var filepath = this.value;
  var m = filepath.match(/([^\/\\]+)$/);
  var filename = m[1];
  $('#filename').html(filename);

});