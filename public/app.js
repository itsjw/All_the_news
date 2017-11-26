// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'animals' (JSON) and creates a table body
function displayResults(scrapeData) {
  // First, empty the table
  $("tbody").empty();

  // Then, for each entry of that json...
  scrapeData.forEach(function(scrape) {
    $("tbody").append("scrape");
    // Append each of the animal's properties to the table
    $("tbody").append("<tr><td>" + + "</td>" +
                          "<td>" + scrape[0].title + "</td>" +
                          "<td>" + scrape[0].link + "</td>" +
                          "</tr>");
  });
}
                       


// Bonus function to change "active" header
function setActive(selector) {
  // remove and apply 'active' class to distinguish which column we sorted by
  $("th").removeClass("active");
  $(selector).addClass("active");
}

// 1: On Load
// ==========

// First thing: ask the back end for json with all animals
$.getJSON("/all", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});

// 2: Button Interactions
// ======================

// When user clicks the weight sort button, display table sorted by weight
$("#headLine").on("click", function() {
  // Set new column as currently-sorted (active)
  setActive("#headLine");

  // Do an api call to the back end for json with all animals sorted by weight
  $.getJSON("/newsLink", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
});

// When user clicks the name sort button, display the table sorted by name
$("#newsLink").on("click", function() {
  // Set new column as currently-sorted (active)
  setActive("#newsLink");

  // Do an api call to the back end for json with all animals sorted by name
  $.getJSON("/newsLink", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  })
