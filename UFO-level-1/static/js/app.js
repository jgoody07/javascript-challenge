// pull data from data.js
var tabledata = data; 
console.log(tabledata);

// select the table body
let tbody = d3.select("tbody");

// create function for the data table
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
        }
      );
    });
  }

// create a clickhandler function
function clickhandler() {

  // Defining date from typed value
  const date = d3.select("#datetime").property("value")

  // Define fitered data 
  let filterdata = tabledata

  // create a filter function
  if (date) {filterdata = filterdata.filter(tablerow => tablerow.datetime === date)

  } 
  buildTable(filterdata)

}
d3.selectAll("#filter-btn").on("click", clickhandler)

  // Call data function
  buildTable(tabledata);