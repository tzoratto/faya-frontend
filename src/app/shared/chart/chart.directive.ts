import {Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter} from '@angular/core';
import {ChartParameter} from './chart-parameter';

declare var google: any;

@Directive({
    selector: '[fayaChart]'
})
export class ChartDirective implements OnInit, OnDestroy, OnChanges {
    private element: any;
    @Input()
    private chartParameter: ChartParameter;
    @Output()
    private chartReady = new EventEmitter();

    private wrapper: any;
    private drawGraphBind: any;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngOnInit(): void {
        this.drawGraphBind = this.drawGraph.bind(this);
        google.charts.setOnLoadCallback(this.drawGraphBind);
        window.addEventListener('resize', this.drawGraphBind, true);
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.drawGraphBind, true);
    }

    ngOnChanges(): void {
        google.charts.setOnLoadCallback(this.drawGraphBind);
    }

    drawGraph(): void {
        this.wrapper = this.wrapper || new google.visualization.ChartWrapper();
        this.wrapper.setChartType(this.chartParameter.chartType);
        this.wrapper.setDataTable(this.chartParameter.chartData);
        this.wrapper.setOptions(this.chartParameter.chartOptions || {});
        this.wrapper.setContainerId(this.element);
        google.visualization.events.addListener(this.wrapper, 'ready', this.onReady.bind(this));
        this.wrapper.draw();
    }

    onReady(): void {
        setTimeout(() => {
            this.chartReady.emit();
        }, 0);
    }
}
