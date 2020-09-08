let sampleData1 = [ 3, 1, 4, 1, 5, 9 ];
let sampleData2 = [ 2, 7, 1, 8, 2, 8 ];

const padding = 50; // 20 pixels of padding around the plot

function toggleData() {
  /*
  console.log('toggleData');
  const tmp = [ ...sampleData1 ]; // make copy of data1 values
  console.log(JSON.stringify(tmp));
  console.log(JSON.stringify(sampleData1));
  console.log(JSON.stringify(sampleData2));
  for (let i = 0; i < sampleData1.length; i++) {
    sampleData1[i] = sampleData2[i];
    sampleData2[i] = tmp[i];
  }
  console.log(JSON.stringify(sampleData1));
  console.log(JSON.stringify(sampleData2));
  */
  const tmp = sampleData1;
  sampleData1 = sampleData2;
  sampleData2 = tmp;

  updatePlot();
}

function updatePlot() {
  // get a d3 reference to the svg placeholder in the HTML
  const plot = d3.select('#d3anchor');

  // get width and height of svg
  const w = plot.node().clientWidth; // this gets us a number in pixels, rather than a string
  const h = plot.node().clientHeight;

  // create the scales to stretch the data out to the width and height of the SVG, with padding
  // also go to 1 less than the minimum value and 1 more than the max in each direction

  // create an x scale that maps the width of the SVG to the number of elements we have, with padding
  const xScale = d3.scaleLinear().domain([ 0, sampleData1.length + 1 ]).range([ padding, w - padding ]);

  // create a y scale the maps the vertical range to the range of values in the array
  // the range looks flipped because SVG puts the origin in the top left, not the bottom left
  const yScale = d3.scaleLinear().domain([ d3.min(sampleData1) - 1, d3.max(sampleData1) + 1]).range([ h - padding, padding ]);

  const plot_circles = plot.selectAll('circle');    // selector for all circles in the plot
  const plot_data = plot_circles.data(sampleData1); // bind the latest version of sampleData1
  
  const plot_new_data = plot_data.enter() // do the following for every element of sampleData1 that is getting added
    .append('circle')     // append a circle for each element in the data set
    .classed('data_point', true) // assign the data_point class to this element

  plot_data.merge(plot_new_data)         // do the following for every point that is updated OR added
    .attr('cx', (d, i) => xScale(i + 1)) // set the x coordinate to the elements array index + 1, scaled to space things out
    .attr('cy', (d) => yScale(d));       // set the y coordinate to the array value, also scaled to space things out

  // replace the axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);
  d3.select('#xaxis').call(xAxis).attr('transform', `translate(0 ${h - padding})`);
  d3.select('#yaxis').call(yAxis).attr('transform', `translate(${padding} 0)`);
}

updatePlot();