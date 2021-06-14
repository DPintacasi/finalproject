// Class selected genres & apply styling
d3.selectAll(".btn-outline-light").on("click", function(){
    var selection = d3.select(this);
    if (selection.classed("selected")){
      selection.classed("selected", false);
    }
    else{
      selection.classed("selected",true);
    };
});


// Submission function
d3.select("#submit-btn").on("click", function(){

  // Button click confirmation
  // console.log("Submitted..."); 

  // Initialise model input object
  var input = {};

  // Grab plot data and append to object
  var plot = d3.select("#inputPlot").property("value");  
  
  // Check if plot is null. Notify the user if it is...
  if (!plot) {
      d3.select("#plot")
      .append("p")
      .style("margin-bottom", 0)
      .append("small")
      .text("Please enter a plot in the text box to get more accurate result :)")
      .classed("text-danger", true)
  }

  input["plot"] = plot;

  // Grab genres and append to object
  // If button is selected, give value of 1, else 0
  var genres = d3.selectAll(".btn-outline-light");
  genres.each(function(){

      if(d3.select(this).classed("selected")){
          var genre = this.value;
          input[genre] = parseInt(1);
      }
      else{
          var genre = this.value;
          input[genre] = parseInt(0);
      }
  })

  // Final input to POST
  console.log(input);
  // -----------------------

  // -----------------------
  // Send inputs to server
  fetch('/predict', {

    // Declare what type of data we're sending
    headers: {
      'Content-Type': 'application/json'
    },
    // Specify the method (POST)
    method: 'POST',
    // A JSON payload
    body: JSON.stringify({
      input
    })
  }).then(function (response) { // At this point, Flask has printed our JSON
    return response.text();
  }).then(function (prediction) {

    // Present prediction
    console.log(`Prediction: ${prediction}`);
    
    // Condition to categorize prediction outcome to HTML template
    if (prediction == 0) {
      d3.select("#rating")
      .text("G")
      .classed("text-success text-info text-warning text-danger", false) // remove class first before append new ones
      .classed("text-success", true)
    }
    else if (prediction == 1) {
      d3.select("#rating")
      .text("PG")
      .classed("text-success text-info text-warning text-danger", false)
      .classed("text-info", true)
    }
    else if (prediction == 2) {
      d3.select("#rating")
      .text("PG-13")
      .classed("text-success text-info text-warning text-danger", false)
      .classed("text-warning", true)
    }
    else { // Rated-R
      d3.select("#rating")
      .text("R")
      .classed("text-success text-info text-warning text-danger", false)
      .classed("text-danger", true)
    }
  });
});





