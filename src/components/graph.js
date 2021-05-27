
import { PolymerElement, html } from "@polymer/polymer";

import * as d3 from 'd3';

class Graph extends PolymerElement {

    static get properties() {
        return {};
    }

    static get template() {
        return html`
            <style>
            :host {
                position: absolute;
                z-index: 0;
                pointer-events: none;
            }
            </style>
            <div id="container"></div>
        `;
    }
    ready() {
        super.ready();

        this.initialize();
    }
    /*
    * We define a function that will instantiate the graph that we have so that we can start
    * drawing the chart
    * */
    initialize() {
        const height = window.screen.height / 2;
        const width = window.screen.width / 2;
        const margin = ({top: 20, right: 30, bottom: 30, left: 40});

        console.log(width, height);

        const svg = d3.select(this.$.container)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        socket.on('general/summary', ({ data }) => {
            const timeseries = data.data;

            const x = d3.scaleTime()
                .domain(d3.extent(timeseries, (d) => new Date(d.date)))
                .range([ 0, width ]);

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([d3.min(timeseries, function(d) { return +d.profit; }), d3.max(timeseries, function(d) { return +d.profit; })])
                .range([ height, 0 ]);

            // Add the line
            svg.append('path')
                .datum(timeseries)
                .attr('fill', 'none')
                .attr('stroke', '#7EC6FF')
                .attr('stroke-width', 2)
                .attr('d', d3.line()
                    .x(function(d) {
                        return x(new Date(d.date));
                    })
                    .y(function(d) {
                        console.log(y(d.profit));
                        return y(d.profit);
                    })
                    .curve(d3.curveMonotoneX)
                )

        });
    }
}

customElements.define('floox-graph', Graph);
