import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { user } from './user';
import { transfers } from './transfers';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent implements OnInit {
  public frame = 0;

  public dataPoints: CanvasJS.ChartDataSeriesOptions[] = [];
  public dataPointsTransfersTotal: CanvasJS.ChartDataSeriesOptions[] = [];
  public dataPointsTopFive: CanvasJS.ChartDataSeriesOptions[] = [];
  public dataPointsCounts: CanvasJS.ChartDataSeriesOptions[] = [];

  public user = user;
  public labels: string[] | undefined;

  constructor() {}

  ngOnInit() {
    this.transfersTotal();

    this.dataPointsCounts = this.countsPerAgent();
    this.dataPointsTopFive = this.topFiveTransfers();
  }

  private countsPerAgent() {
    const data = [...transfers];
    const date = transfers[0].date;

    const transfersTotal: { [key: string]: { label: string; y: number } } = {};

    data.forEach(elem => {
      if (elem.date === date) {
        if (!transfersTotal[elem.name]) {
          transfersTotal[elem.name] = {
            label: elem.name,
            y: 0,
          };
        }
        transfersTotal[elem.name].y += elem.Transfers;
      }
    });

    const dataPoints = [];

    for (const key in transfersTotal) {
      if (transfersTotal.hasOwnProperty(key)) {
        dataPoints.push(transfersTotal[key]);
      }
    }

    return <CanvasJS.ChartDataSeriesOptions[]>[
      {
        dataPoints: dataPoints.sort((a, b) => {
          if (a.y < b.y) {
            return -1;
          }
          if (a.y > b.y) {
            return 1;
          }
          return 0;
        }),
      },
    ];
  }

  /**
   * Map top 5 Transfers
   */
  private topFiveTransfers() {
    const data = [...transfers];

    const transfersTotal: { [key: string]: { label: string; y: number } } = {};

    data.forEach(elem => {
      if (!transfersTotal[elem.name]) {
        transfersTotal[elem.name] = {
          label: elem.name,
          y: 0,
        };
      }
      transfersTotal[elem.name].y += elem.Transfers;
    });
    const dataPoints = [];

    for (const key in transfersTotal) {
      if (transfersTotal.hasOwnProperty(key)) {
        dataPoints.push(transfersTotal[key]);
      }
    }

    const mapped = <CanvasJS.ChartDataSeriesOptions[]>[
      {
        dataPoints: dataPoints
          .sort((a, b) => {
            if (a.y < b.y) {
              return -1;
            }
            if (a.y > b.y) {
              return 1;
            }
            return 0;
          })
          .reverse(),
      },
    ];
    mapped[0].dataPoints.length = 10;
    mapped[0].dataPoints.reverse();
    return mapped;
  }

  /** Map total transfers */
  private transfersTotal() {
    const date = transfers[0].date;
    const transfersByAgent: { [key: string]: any[] } = {};
    transfers.forEach(user2 => {
      if (user2.date === date) {
        const key = user2.date + 'T' + user2.Time;
        if (!transfersByAgent[key]) {
          transfersByAgent[key] = [];
        }
        transfersByAgent[key].push(user2);
      }
    });

    this.dataPointsTransfersTotal = [];
    for (const key in transfersByAgent) {
      if (transfersByAgent.hasOwnProperty(key)) {
        this.dataPointsTransfersTotal.push({
          name: transfersByAgent[key][0].Time,
          dataPoints: transfersByAgent[key].map(transfer => {
            return <CanvasJS.ChartDataPoint>{
              label: transfer.name,
              y: transfer.Transfers,
            };
          }),
        });
      }
    }
  }

  public formatTooltip(val: CanvasJS.ChartLabelFormatter): string {
    return val.label + '!!';
  }
}
