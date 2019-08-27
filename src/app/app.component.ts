import { Component, ViewChild, OnInit } from '@angular/core';
import { DatasetRecord } from './dataset.models';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  csvUrl = 'assets/C4C-dev-challenge-2018.csv';

  public records: any[] = [];
  @ViewChild('csvReader', { static: false }) csvReader: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'violation_id',
    'inspection_id',
    'violation_category',
    'violation_date',
    'violation_date_closed',
    'violation_type',
  ];
  dataSource: MatTableDataSource<DatasetRecord>;

  csvArr = [];
  categoryList = [];
  categoryViolations = {};
  categoryViolationDatesEarly = {};
  categoryViolationDatesLate = {};

  categoryViolationsArr = [];
  categoryViolationDatesEarlyArr = [];
  categoryViolationDatesLateArr = [];

  constructor(private http: HttpClient) {
    this.http.get(this.csvUrl, { responseType: 'text' }).subscribe(
      data => {
        const csvData = data;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
        this.dataSource = new MatTableDataSource(this.records);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        alert('Could not load .csv file.');
        this.records = [];
      }
    );
  }

  ngOnInit() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');

      if (curruntRecord.length === headerLength) {
        const csvRecord: DatasetRecord = new DatasetRecord();
        csvRecord.violation_id = curruntRecord[0].trim();
        csvRecord.inspection_id = curruntRecord[1].trim();
        csvRecord.violation_category = curruntRecord[2].trim();
        csvRecord.violation_date = curruntRecord[3].trim();
        csvRecord.violation_date_closed = curruntRecord[4].trim();
        csvRecord.violation_type = curruntRecord[5].trim();
        this.makeCategoryList(csvRecord);
        this.csvArr.push(csvRecord);
      }
    }

    this.solveChallenge();

    return this.csvArr;
  }

  solveChallenge = () => {
    for (const category of this.categoryList) {
      const recordsForCurrentCategory = this.csvArr.filter(record => {
        return record.violation_category === category;
      });

      const categoryCounter = recordsForCurrentCategory.length;

      const earlyViolationDate = new Date(
        Math.min.apply(
          null,
          recordsForCurrentCategory.map(record => {
            return new Date(record.violation_date);
          })
        )
      );

      const lateViolationDate = new Date(
        Math.max.apply(
          null,
          recordsForCurrentCategory.map(record => {
            return new Date(record.violation_date);
          })
        )
      );

      this.categoryViolations[category] = categoryCounter;
      this.categoryViolationDatesEarly[category] = earlyViolationDate;
      this.categoryViolationDatesLate[category] = lateViolationDate;
    }

    Object.keys(this.categoryViolations).forEach(key => {
      this.categoryViolationsArr.push({
        category: key,
        violations: this.categoryViolations[key],
      });
    });

    Object.keys(this.categoryViolationDatesEarly).forEach(key => {
      this.categoryViolationDatesEarlyArr.push({
        category: key,
        date: this.categoryViolationDatesEarly[key].toDateString(),
      });
    });

    Object.keys(this.categoryViolationDatesLate).forEach(key => {
      this.categoryViolationDatesLateArr.push({
        category: key,
        date: this.categoryViolationDatesLate[key].toDateString(),
      });
    });
  };

  makeCategoryList = (csvRecord: DatasetRecord) => {
    if (
      !this.categoryList.find(item => item.match(csvRecord.violation_category))
    ) {
      this.categoryList.push(csvRecord.violation_category);
    }
  };

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
}
