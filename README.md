# BiodiversityJavaScriptCharts

A website that utilizes JSON data regarding belly button biodiversity is created. This website contains a few different sections:


## 1. Drop-down Menu 

A drop-down menu is made which contains all the unique Subject ID numbers in the dataset. The viewer is able to select a particular Subject ID number from this menu. 

This is fufilled by creating a function called "init", which extracts the "name" information from the data. Each of the values in the "name" portion of the data is iterated and filled in the "#selDataset" part of the HTML code. 

## 2. Demographic Information Panel 

Based on the selected Subject ID number from the drop-down menu, the demographic information that is associated with the respective Subject ID number is displayed in a box. The demographic information that is provided is: Subject ID, ethnicity, gender, age, location, bbytype, and wfreq. 

This is done by creating a function called "buildMetadata", which extracts the "Metadata" section of the data for a particular sample(Subject ID) and then appends the Metadata information into the "sample-metadata" portion of the HTML code in a "key: value" format. 



## 3. Bubble Chart 

A bubble chart is made according to the selected Subject ID. 

This is achieved by creating a function named "buildCharts", which extracts the "sample" section of the data for a selected sample (Subject ID). The "otu_ids", "otu_labels" and "sample_values" for the data are assigned to the variables "otu_id", "otu_label", and "sample_value", respectively. After this information is gathered, the trace is defined with: The "otu_id" variable is used for the x-axis and marker colors, the "sample_value" variable is used for the y-axis and the marker size, and the "otu_label" variable is used for the text values. After which, Plotly is used to plot the bubble chart. 


## 4. Bar Graph

A bar graph is created based for the selected Subject ID. This horizontal bar graph plots the top 10 highest OTUs that are found.  

The same function that was used to construct the bubble chart (buildChart) is used to build the bar graph. To get the y-ticks, the "otu_id" variable is sliced to get only the first 10 highest values, mapped to be in a string format that begins with "OTU", and then reversed. To get the x-axis, the "sample_value" variable is also sliced for the first 10 values and reversed. To get the text, the "otu_label" variable is sliced the same amount and reversed. Once all of this is found, the trace is constructed and Plotly is used to construct the bar graph. 


## Webpage Default and Changes

The "init" function from earlier also contains code which selects the first value in the "name" section of the dataset and then calls the buildMetadata and buildCharts functions for that "name". This will make it so the initial loading of the page will have information displayed regarding the first name. 

A function called "optionChanged" is made, which runs the buildMetadata and buildCharts functions upon an event change. In other words, the two plots and demographic information panel will be adjusted each time a new Subject ID is selected in the drop-down menu. 