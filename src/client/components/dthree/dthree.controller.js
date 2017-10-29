import * as d3 from 'd3';

/*
    data structure:
    data = {
        readings: [{
            value: 100,
            timestamp: 100,
        }, {
            value: 100,
            timestamp: 100,
        }, {
            value: 100,
            timestamp: 100,
        }]
    }


*/

export default class dthree {
    constructor($scope, $location) {
        'ngInject';
        this.$scope = $scope;
        this.$location = $location;
    }

    $onInit() {
        const data = {
            streams: [],
        };
        data.streams.push(this.generateGraphData(20));
        data.streams.push(this.generateGraphData(40));
        data.streams.push(this.generateGraphData(60));
        data.streams.push(this.generateGraphData(80));
        this.drawGraph(data);
    }

    generateGraphData(start) {
        const newData = {
            readings: [],
        };
        let time = new Date().getTime();
        for (let index = 0; index < 100; index ++) {
            let newValue = start + Math.random() * 100;
            if (index > 0) {
                // unsure if this is correctly working yet, awaiting rest of graph.
                if (newValue > newData.readings[index - 1].value + 5) {
                    newValue = newData.readings[index - 1].value + 5;
                }
                if (newValue < newData.readings[index - 1].value - 5) {
                    newValue = newData.readings[index - 1].value - 5;
                }
            }
            const newReading = {
                value: newValue,
                timestamp: time,
            };
            newData.readings.push(newReading);
            time -= 1000 * 60 * 5; // decrement by five minutes.
        }
        newData.name = 'myGraph';
        newData.readings.reverse();
        return newData;
    }

    drawGraph(data) {
        const container = $('#graph-container');
        container.html('');

        let width = container[0].clientWidth;
        let height = 400;
        const margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 40,
        };
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        let start = data.streams[0].readings[0].timestamp;
        let end = data.streams[0].readings[0].timestamp;
        let min = data.streams[0].readings[0].value;
        let max = data.streams[0].readings[0].value;

        // Set min and max values
        data.streams.forEach((stream) => {
            stream.readings.forEach((reading) => {
                if (min > reading.value) {
                    min = reading.value;
                }
                if (max < reading.value) {
                    max = reading.value;
                }
                if (start > reading.timestamp) {
                    start = reading.timestamp;
                }
                if (end < reading.timestamp) {
                    end = reading.timestamp;
                }
            });
        });

        const newChart = d3.select('#graph-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.bottom})`);
            // .classed('svg-content-responsive', true);

        // Scale
        const xScale = d3.scaleTime()
            .domain([new Date(start), new Date(end)])
            .rangeRound([0, width]);

        const yScale = d3.scaleLinear()
            .domain([min, max])
            .rangeRound([height, margin.bottom]);

        // yAxis
        const yAxis = d3.axisLeft(yScale)
            .tickSizeInner(- width)
            .tickSizeOuter(0)
            .ticks(10)
            .tickFormat((value) => { //eslint-disable-line
                // const f = d3.format('.1f');
                return value;
            });

        newChart.append('g')
            .call(yAxis);

        // X Axis
        const xAxis = d3.axisBottom(xScale)
            .tickSizeInner(- height + margin.bottom)
            .tickSizeOuter(0)
            .tickPadding(10)
            .ticks(5);

        newChart.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        // Top border
        newChart.append('g')
            .append('line')
            .attr('class', 'chart-axis')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', margin.bottom)
            .attr('y2', margin.bottom);

        // Right border
        newChart.append('g')
            .append('line')
            .attr('class', 'chart-axis')
            .attr('x1', width)
            .attr('x2', width)
            .attr('y1', margin.bottom)
            .attr('y2', height);

        const fontSizeForLegend = 14;
        // Graph title
        newChart.append('text')
            .attr('class', 'chart-title-text')
            .attr('x', 0)
            .attr('y', fontSizeForLegend)
            .text('Dragonfly Readings');

        // Legend
        const colors = ['#FFB90F', '#62f1ff', 'blue', 'red', 'green', 'yellow'];
        const textElements = [];
        for (let index = 0; index < data.streams.length; index ++) {
            let newX = 0;
            for (let itter = 0; itter < index; itter ++) {
                newX += data.streams[itter].name.length + 2;
            }
            newX *= fontSizeForLegend;
            // Legend text
            const text = newChart.append('text')
                .attr('class', 'chart-legend-text')
                .style('text-anchor', 'end')
                .attr('x', width - 18 - newX)
                .attr('y', fontSizeForLegend)
                .text(data.streams[index].name);
            textElements.push(text);

            // Legend icon
            newChart.append('rect')
                .attr('fill', colors[index])
                .attr('x', width - fontSizeForLegend - newX)
                .attr('y', 2)
                .attr('width', fontSizeForLegend)
                .attr('height', fontSizeForLegend);
        }

        // Graph lines
        const lineFunction = d3.line()
            .defined(() => { //eslint-disable-line
                // TODO: add linebreak behaivor
                return true;
            })
            .curve(d3.curveCardinal)
            .x((value) => xScale(value.timestamp))
            .y((value) => yScale(value.value));

        for (let index = 0; index < data.streams.length; index++) {
            newChart.append('path')
                .attr('d', lineFunction(data.streams[index].readings))
                .attr('stroke', colors[index])
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        }

        // TOOL-TIPS
        // Tooltip container
        const circleElements = [];

        const tooltip = newChart.append('g')
            .style('display', 'none');

        // Tooltip circle
        data.streams.forEach((stream) => {
            const newCircle = tooltip.append('circle')
                .attr('class', 'tooltip-circle')
                .style('fill', 'none')
                .style('stroke', 'blue')
                .attr('r', 4);
            circleElements.push(newCircle);
        });

        // Y-axis line for tooltip
        const yLine = tooltip.append('g')
            .append('line')
            .attr('class', 'tooltip-line')
            .style('stroke', 'blue')
            .style('stroke-dasharray', '3,3')
            .style('opacity', 0.5)
            .attr('y1', margin.bottom)
            .attr('y2', height);

        // Date text
        const timeText = tooltip.append('text')
            .attr('x', 12 * 'Dragonfly Readings'.length)
            .attr('y', margin.top - 5)
            .attr('width', 100)
            .attr('height', 100 * 0.4)
            .attr('fill', 'black');

        // Tooltip helper
        const bisectDate = d3.bisector((value) => value.timestamp).right;

        function mousemove() {
            const x0 = parseInt(Date.parse(xScale.invert(d3.mouse(this)[0]))); // jshint ignore:line

            for (let stream = 0; stream < data.streams.length; stream ++) {
                const index = bisectDate(data.streams[stream].readings, x0, 1);
                const d0 = data.streams[stream].readings[index - 1];
                const d1 = data.streams[stream].readings[index];
                if (d1 === undefined) {
                    return;
                }
                const d2 = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
                circleElements[stream].attr('transform', `translate(${xScale(d2.timestamp)},${yScale(d2.value)})`);
                yLine.attr('transform', `translate(${xScale(d2.timestamp)}, 0)`);
                timeText.text(new Date(d2.timestamp));

                textElements[stream]
                    .text(`${data.streams[stream].name}  ${parseInt(d2.value)}`)
                    .attr('fill', colors[stream]);
            }
        }

        // Drag behaivors for the selection box.
        let dragStart = 0;
        let dragStartPos = 0;
        let dragEnd = 0;
        const that = this;
        const drag = d3.drag()
            .on('drag', function () {
                const x0 = parseInt(Date.parse(xScale.invert(d3.mouse(this)[0]))); // jshint ignore:line
                const index = bisectDate(data.streams[0].readings, x0, 1);
                const d0 = data.streams[0].readings[index - 1];
                const d1 = data.streams[0].readings[index];
                if (d1 === undefined) {
                    return;
                }
                const d2 = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;

                if (xScale(d2.timestamp) > dragStartPos) {
                    selectionBox.attr('width', (xScale(d2.timestamp) - dragStartPos));
                } else {
                    selectionBox.attr('width', (dragStartPos - xScale(d2.timestamp)));
                    selectionBox.attr('transform', `translate(${xScale(d2.timestamp)},0)`);
                }
            })
            .on('end', function () {
                dragEnd = d3.mouse(this)[0];
                if (Math.abs(dragStart - dragEnd) < 10) {
                    return;
                }
                const x0 = xScale.invert(dragStart);
                const x1 = xScale.invert(dragEnd);
                that.$scope.$apply(() => {
                    if (x1 > x0) {
                        that.$location.search('start_date', x0.getTime());
                        that.$location.search('end_date', x1.getTime());
                    } else {
                        that.$location.search('start_date', x1.getTime());
                        that.$location.search('end_date', x0.getTime());
                    }
                });
            });
        // Update loop for tooltips.
        // Selection box
        const selectionBox = newChart.append('rect')
            .attr('fill', 'none')
            .attr('opacity', 0.5)
            .attr('x', 0)
            .attr('y', margin.top)
            .attr('width', 14)
            .attr('height', height - margin.top);

        // Hit area for selection box
        newChart.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', () => {
                tooltip.style('display', null);
            })
            .on('mouseout', () => {
                tooltip.style('display', 'none');
                for (let index = 0; index < data.streams.length; index++) {
                    textElements[index]
                        .text(`${data.streams[index].name}`)
                        .attr('fill', 'black');
                }
            })
            .on('mousemove', mousemove)
            .on('mousedown', () => {
                selectionBox.attr('fill', '#b7ff64');
                dragStart = d3.mouse(d3.event.currentTarget)[0];
                const x0 = xScale.invert(dragStart);
                const index = bisectDate(data.streams[0].readings, x0, 1);
                const d0 = data.streams[0].readings[index - 1];
                const d1 = data.streams[0].readings[index];
                const d2 = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
                selectionBox.attr('transform', `translate(${xScale(d2.timestamp)},0)`);
                dragStartPos = xScale(d2.timestamp);
            })
            .call(drag);
    }
}
