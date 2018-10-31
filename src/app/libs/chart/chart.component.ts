import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
// import { formatDate, formatNumber, formatCurrency, formatPercent } from '@angular/common';
const defaultsDeep = require('lodash/defaultsDeep');

declare global {
  interface Window {
    CanvasJS: any;
  }
}

// JS file source
const chartSrc = 'assets/scripts/canvasjs.min.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  /** TEMP */
  @ViewChild('element') element: ElementRef;
  @ViewChild('tooltipCustom') tooltipCustom: ElementRef;

  @Input()
  type:
    | 'line'
    | 'column'
    | 'bar'
    | 'area'
    | 'spline'
    | 'splineArea'
    | 'stepLine'
    | 'scatter'
    | 'bubble'
    | 'stackedColumn'
    | 'stackedBar'
    | 'stackedArea'
    | 'stackedColumn100'
    | 'stackedBar100'
    | 'stackedArea100'
    | 'pie'
    | 'doughnut' =
    'column';
  @Input() width: string;
  @Input() height: string;
  @Input() data: CanvasJS.ChartDataSeriesOptions[];
  @Input() options: Partial<CanvasJS.ChartOptions>;
  @Input() stacked: boolean;

  /** Colors for data points in RGB */
  @Input() colorSet: string;
  @Input() colorGradient: [string, string];
  @Input() colorsCustom: string[] = [];

  // Format Elements
  @Input() formatTooltip: any;
  @Input() formatTooltipTitle: any;
  @Input() formatDatalabel: any;
  @Input() formatXLabels: any;
  @Input() formatYLabels: any;

  // Show/Hide Elements
  /** Show or hide the tooltip which appears when you hover over a chart entry */
  @Input() showLegend = true;
  /** Show or hide the values that appear inside the chart */
  @Input() showIndexLabel = false;
  /** Show or hide the tooltip which appears when you hover over a chart entry */
  @Input() showTooltip = true;
  /** Show or hide the labels that appear on the X axis */
  @Input() showXAxisLabels = true;
  /** Show or hide the labels that appear on the Y axis */
  @Input() showYAxisLabels = true;

  // Titles
  /** Title to show for the main chart */
  @Input() titleChart: string;
  /** Title to show for the X Axis, leave null for none */
  @Input() titleXAxis: string;
  /** Title to show for the Y Axis, leave null for none */
  @Input() titleYAxis: string;

  // Template
  /** Supply a custom html template for the tooltip */
  @Input() templateTooltip: any = null;

  /** Randomly generated uniqueID for the div that holds the chart. Allows for multiple charts per page */
  public uniqueId = 'chart' + Math.floor(Math.random() * 1000000);

  /** Chart reference */
  private chart: CanvasJS.Chart;

  /** If custom colors supplied, this is the auto-generated name of the color scheme */
  private colorScheme: string;

  /** After initial load */
  private isLoaded = false;

  private styling = {
    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    fontSize: 10,
    fontWeight: 'normal',
  };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.scriptsLoad();
  }

  ngOnChanges() {
    // Only update chart
    if (this.isLoaded) {
      this.chartInit();
    }
  }

  /**
   * Check if Chart.js is loaded, if not, load it then initialize the chart in this component
   */
  public scriptsLoad() {
    if (window.CanvasJS) {
      this.chartInit(); // Chart.js already loaded, init chart
      this.isLoaded = true;
    } else {
      // Dynamically load chart module
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = chartSrc;
      script.onload = () => {
        this.chartInit();
        this.isLoaded = true;
      }; // After load, init chart
      document.head.appendChild(script);
    }
  }

  /**
   * Initialize the chart
   */
  private chartInit() {
    if (this.element && this.element.nativeElement && window.CanvasJS) {
      //  && this.dataSets
      // Clean up any previous references before reinitializing the chart
      this.ngOnDestroy();

      if (this.colorsCustom) {
        this.colorScheme = 'customColors-' + this.colorsCustom.join;
        window.CanvasJS.addColorSet(this.colorScheme, this.colorsCustom);
      }

      // Create chart from WINDOW reference not import
      // Due to bug with plugins registered with global instance and not being available via imports
      this.chart = new window.CanvasJS.Chart(this.uniqueId, this.chartOptionsCreate());
      this.chart.render();
    }
  }

  /**
   * Create the options needed by this chart
   */
  public chartOptionsCreate() {
    // If color gradient is specified, create it to match datapoint range
    if (this.colorGradient && this.data && this.data[0] && this.data[0].dataPoints.length) {
      this.colorsCustom = this.getColorScheme(
        this.colorGradient[0],
        this.colorGradient[1],
        this.data[0].dataPoints.length,
      );
    }

    // If custom colors supplied, register with chart plugin
    if (this.colorsCustom) {
      this.colorScheme = 'customColors-' + this.colorsCustom.join;
      window.CanvasJS.addColorSet(this.colorScheme, this.colorsCustom);
    }

    // Create default options
    const options = <CanvasJS.ChartOptions>{
      animationEnabled: true,
      exportEnabled: false,
      animationDuration: 600,
      title: {
        text: this.titleChart,
        fontSize: 18,
        fontFamily: this.styling.fontFamily,
        fontWeight: this.styling.fontWeight,
      },
      // theme: "light2",
      toolTip: {
        enabled: this.showTooltip,
        fontColor: this.formatTooltip ? this.formatTooltip : null,
      },
      legend: {
        fontSize: this.styling.fontSize,
        fontFamily: this.styling.fontFamily,
        cursor: 'pointer',
        // Enable the legend to toggle dataseries on or off
        itemclick: e => {
          e.dataSeries.visible = typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible ? false : true;
          this.chart.render();
        },
      },
      colorSet: this.colorSet ? this.colorSet : this.colorScheme ? this.colorScheme : null, // Use built in color set if supplied, use custom colors if not
      data: this.mapChartData(),
      axisX: {
        title: this.titleXAxis,
        titleFontSize: 16,
        interval: 1,
        labelFontSize: this.styling.fontSize,
        labelFontFamily: this.styling.fontFamily,
        labelFormatter: (this.formatXLabels || this.showXAxisLabels === false) ? val => {
          if (this.showXAxisLabels === false) {
            return ''; // If show labels is disabled, return empty string which hides the labels
          }
          return this.formatXLabels(val); // If custom formatter supplied, format strings
        } : null, // Otherwise return default value
      },
      axisY: {
        title: this.titleYAxis,
        titleFontSize: 16,
        labelFontSize: this.styling.fontSize,
        labelFontFamily: this.styling.fontFamily,
        labelFormatter: (this.formatYLabels || this.showYAxisLabels === false) ? val => {
          if (this.showYAxisLabels === false) {
            return ''; // If show labels is disabled, return empty string which hides the labels
          }
          return this.formatYLabels(val); // If custom formatter supplied, format strings
        } : null, // Otherwise return default value
      },
    };
    // console.log(options)
    // Return options object with overrides
    return defaultsDeep(this.options, options);
  }

  /**  */
  private mapChartData(): CanvasJS.ChartDataSeriesOptions[] {
    return this.data.map(data => {
      return <CanvasJS.ChartDataSeriesOptions>{
        type: this.type,
        showInLegend: this.showLegend,
        indexLabel: this.showIndexLabel ? '{y}' : null,
        indexLabelFontSize: 10,
        // indexLabelFontColor: '#fff',
        // legendText: this.data[0].label,
        ...data,
      };
    });
  }

  /**
   * Creates a gradient with a fixed number of steps in a string array
   * @param startColor - Hex start color
   * @param endColor - Hex end color
   * @param steps - The number of hex colors to return
   */
  private getColorScheme(startColor: string, endColor: string, steps: number) {
    const colorsCustom: string[] = [];
    for (var i = 0; i <= steps; i++) {
      colorsCustom.push(this.getGradientStep(startColor, endColor, i / steps));
    }
    return colorsCustom;
  }

  /**
   * Get a color hex value between 2 input colors as part of a gradient
   * @param startColor - Hex start color
   * @param endColor - Hex end color
   * @param percent
   */
  private getGradientStep(startColor: string, endColor: string, percent: number) {
    // Strip the leading # if it's there
    startColor = startColor.replace(/^\s*#|\s*$/g, '');
    endColor = endColor.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (startColor.length == 3) {
      startColor = startColor.replace(/(.)/g, '$1$1');
    }

    if (endColor.length == 3) {
      endColor = endColor.replace(/(.)/g, '$1$1');
    }

    // Get colors
    let startRed = parseInt(startColor.substr(0, 2), 16),
      startGreen = parseInt(startColor.substr(2, 2), 16),
      startBlue = parseInt(startColor.substr(4, 2), 16);

    let endRed = parseInt(endColor.substr(0, 2), 16),
      endGreen = parseInt(endColor.substr(2, 2), 16),
      endBlue = parseInt(endColor.substr(4, 2), 16);

    // Calculate new color
    let diffRed = endRed - startRed;
    let diffGreen = endGreen - startGreen;
    let diffBlue = endBlue - startBlue;

    let diffRedStr = (diffRed * percent + startRed).toString(16).split('.')[0];
    let diffGreenStr = (diffGreen * percent + startGreen).toString(16).split('.')[0];
    let diffBlueStr = (diffBlue * percent + startBlue).toString(16).split('.')[0];

    // ensure 2 digits by color
    if (diffRedStr.length == 1) diffRedStr = '0' + diffRed;
    if (diffGreenStr.length == 1) diffGreenStr = '0' + diffGreenStr;
    if (diffBlueStr.length == 1) diffBlueStr = '0' + diffBlueStr;

    return '#' + diffRedStr + diffGreenStr + diffBlueStr;
  }

  /**
   * Supply a formatter method OR an Angular pipe to the chart instance
   * Used to format labels, values, datalabels, etc
   * @param option
   
  public formatData(option: FormatData | Formatter) {
    // Check if a custom formatter was supplied, if not use angular pipe
    if (typeof option !== 'function' && option.pipe) {
      let format = option.format;

      if (!option.format) {
        format = '';
      }

      switch (option.pipe) {
        // Use decimal pipe
        case 'number':
          return (tooltipItem: Chart.ChartTooltipItem, _data: Chart.ChartData) =>
            formatNumber(Number(tooltipItem.yLabel), 'en-US', format);
        // Datepipe
        case 'date':
          return (tooltipItem: Chart.ChartTooltipItem, _data: Chart.ChartData) =>
            formatDate(Number(tooltipItem.yLabel), format, 'en-US');
        // Currency pipe
        case 'currency':
          return (tooltipItem: Chart.ChartTooltipItem, _data: Chart.ChartData) =>
            formatCurrency(Number(tooltipItem.yLabel), 'en-US', '', format);
        // Percent pipe
        case 'percent':
          return (tooltipItem: Chart.ChartTooltipItem, _data: Chart.ChartData) =>
            formatPercent(Number(tooltipItem.yLabel), 'en-US', format);
        default:
          console.warn('Improper values supplied for chart formatter', option);
          break;
      }
    } else {
      return <Formatter>option;
    }

  }
  */

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
