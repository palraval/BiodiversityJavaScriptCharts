// Builds the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Gets the metadata field
    var metadata = data.metadata;

    // Filters the metadata for the object with the desired sample number

    var filtered = metadata.filter(metObj => metObj.id == sample);

    
    // Uses d3 to select the panel with id of `#sample-metadata`

    var sample_metadata_panel = d3.select("#sample-metadata");


    // Uses `.html("") to clear any existing metadata
    sample_metadata_panel.html("");

    //  for loop and d3 is used to append new tags for each key-value in the filtered metadata 

    var filtered2 = filtered[0]
    
    Object.entries(filtered2).forEach(([key,value]) => {
      sample_metadata_panel.append("html").text(`${key.toUpperCase()}: ${value}`)
    })
    }

  )};



// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Gets the samples field

    var samples = data.samples;

  
    // Filters the samples for the object with the desired sample number

    var filtered_sample = samples.filter(samObj => samObj.id == sample);

  
    // Gets the otu_ids, otu_labels, and sample_values

    var filtered_sample2 = filtered_sample[0];

    var otu_id = filtered_sample2.otu_ids;


    var otu_label = filtered_sample2.otu_labels;

    var sample_value = filtered_sample2.sample_values;

    // Builds a Bubble Chart

    var trace = {
      x: otu_id,
      y: sample_value,
      marker:{
        size: sample_value,
        color: otu_id,
        colorscale: 'Viridis'
        },
      text: otu_label,
      mode: 'markers'
    };

    var data = [trace];

    var layout = {
      title: "Bacteria Cultures per Sample",
      xaxis: {
        title: 'otu_id'
      },
      yaxis: {
        title: 'Number of Bacteria'
      }
    };




    // Renders the Bubble Chart
    
    Plotly.newPlot('bubble', data, layout);

    // For the Bar Chart, maps the otu_ids to a list of strings for yticks

    var format_top_otu_ids = otu_id.slice(0,10).map(id => `OTU ${id}`).reverse()
    
  
    // Builds a Bar Chart for the top 10 sample_values length using slicing and reversing
  
    var trace2 = {
      x: sample_value.slice(0,10).reverse(),
      y: format_top_otu_ids,
      text: otu_label.slice(0,10).reverse(),
      orientation: 'h',
      type: 'bar'
    };

    var data2 = [trace2];

    var layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: 'Number of Bacteria'
      }
    }; 

    // Renders the Bar Chart
    Plotly.newPlot('bar', data2, layout2);

  });
}





// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Gets the names field

    var names = data.names;
    

    // Uses d3 to select the dropdown with id of `#selDataset`

    var dropdown_id = d3.select("#selDataset");

    // Uses the list of sample names to populate the select options (for loop)

    for (i = 0; i < names.length; i ++){
      dropdown_id.append('option').text(names[i]);
    }

    // Gets the first sample from the list

    var first_sample = names[0];


    // Builds charts and metadata panel with the first sample

    buildMetadata(first_sample);

    buildCharts(first_sample);

  });
}


// Function for event listener
function optionChanged(newSample) {
  // Builds charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}


// Initializes the dashboard
init();
