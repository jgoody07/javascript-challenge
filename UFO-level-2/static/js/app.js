// get from data.js
var tableData = data;

// select the table body
var tbody = d3.select("tbody");


// Create data table function
function buildTable(data) {
  // Clear out any existing data
  tbody.html("");

  // Loop through each object in the data
    data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Variable to keep track of all filters
var filters = {};

// Create filters function
function updateFilters() {

  // Save the element, value, and id of the filter from input
  let changedElement = d3.select(this).select("input");
  let elementValue = changedElement.property("value");
  let filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value to the filters list. 
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  // Otherwise, clear that filter from the filters object
  else {
    delete filters[filterId];
  }

  // Call function to apply all filters and rebuild the table
  filterTable();

}

// Create filtered table function
function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and store data 
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Rebuild the table using the filtered Data
  buildTable(filteredData);
}

// create event handlers for change
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);