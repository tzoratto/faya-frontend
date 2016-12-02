import { Injectable } from '@angular/core';
import {ChartParameter} from './chart-parameter';
import {DatePipe} from '@angular/common';
import {TranslateService} from 'ng2-translate';

@Injectable()
export class ChartService {

    constructor(private datePipe: DatePipe,
                private translateService: TranslateService) { }

    dayHistoryChartData(data: any): ChartParameter {
        let today = new Date(),
            currentYear = today.getUTCFullYear(),
            currentMonth = today.getUTCMonth(),
            currentDay = today.getUTCDate(),
            currentHour = today.getUTCHours();
        let chartOptions: any = {
            title: this.translateService.instant('tokenHit.lastDay'),
            legend: 'none',
            hAxis: {
                format: 'HH:mm'
            },
            vAxis: {
                minValue: 0,
                maxValue: 4,
                format: '#,###'
            }
        };
        let header: Array<any> = [
            [{type: 'datetime'}, this.translateService.instant('tokenHit.hitRaw')]
        ];

        let chartData = header.concat(data.map(entry => {
            let entryDay = entry.hour > currentHour ? currentDay - 1 : currentDay;
            let entryDate = new Date(currentYear, currentMonth, entryDay, entry.hour, 0);
            return [{v: entryDate, f: this.datePipe.transform(entryDate, 'y/MM/dd, HH:mm')}, entry.count];
        }));

        return new ChartParameter('ColumnChart', chartData, chartOptions);
    }

    monthHistoryChartData(data: any): ChartParameter {
        let today = new Date(),
            currentYear = today.getUTCFullYear(),
            currentMonth = today.getUTCMonth(),
            currentDay = today.getUTCDate();
        let chartOptions: any = {
            title: this.translateService.instant('tokenHit.lastMonth'),
            legend: 'none',
            hAxis: {
                format: 'dd/MM'
            },
            vAxis: {
                minValue: 0,
                maxValue: 4,
                format: '#,###'
            }
        };
        let header: Array<any> = [
            [{type: 'date'}, this.translateService.instant('tokenHit.hitRaw')]
        ];

        let chartData = header.concat(data.map(entry => {
            let entryMonth = entry.day > currentDay ? currentMonth - 1 : currentMonth;
            let entryDate = new Date(currentYear, entryMonth, entry.day, 0, 0);
            return [{v: entryDate, f: this.datePipe.transform(entryDate, 'y/MM/dd')}, entry.count];
        }));

        return new ChartParameter('ColumnChart', chartData, chartOptions);
    }

    yearHistoryChartData(data: any): ChartParameter {
        let today = new Date(),
            currentYear = today.getUTCFullYear(),
            currentMonth = today.getUTCMonth();
        let chartOptions: any = {
            title: this.translateService.instant('tokenHit.lastYear'),
            legend: 'none',
            hAxis: {
                format: 'MMM yyyy'
            },
            vAxis: {
                minValue: 0,
                maxValue: 4,
                format: '#,###'
            }
        };
        let header: Array<any> = [
            [{type: 'date'}, this.translateService.instant('tokenHit.hitRaw')]
        ];

        let chartData = header.concat(data.map(entry => {
            let entryYear = (entry.month - 1) > currentMonth ? currentYear - 1 : currentYear;
            let entryDate = new Date(entryYear, entry.month - 1, 1, 0, 0);
            return [{v: entryDate, f: this.datePipe.transform(entryDate, 'y/MM')}, entry.count];
        }));

        return new ChartParameter('ColumnChart', chartData, chartOptions);
    }
}
