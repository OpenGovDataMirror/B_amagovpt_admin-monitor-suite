import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {GetService} from '../../services/get.service';
import {DeleteService} from '../../services/delete.service';
import {AddCrawlerPagesDialogComponent} from '../../dialogs/add-crawler-pages-dialog/add-crawler-pages-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {CrawlerConfigDialogComponent} from '../../dialogs/crawler-config-dialog/crawler-config-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-of-crawls',
  templateUrl: './list-of-crawls.component.html',
  styleUrls: ['./list-of-crawls.component.css']
})
export class ListOfCrawlsComponent implements OnInit {

  displayedColumns = [
    'Domain',
    'Subdomain',
    'InitialDate',
    'Status',
    'Result',
    'Delete'
  ];

  user: string;

  loading: boolean;
  error: boolean;

  dataSource: any;
  selection: any;

  crawls: Array<any>;

  isListEmpty: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
              private translate: TranslateService,
              private deleteService: DeleteService,
              private get: GetService,
              private cd: ChangeDetectorRef,
              private router: Router) {
    this.selection = new SelectionModel<any>(true, []);
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getListOfCrawls();
  }

  private getListOfCrawls(): void {
    this.get.listOfCrawls()
      .subscribe(crawls => {
        if (crawls !== null) {
          this.isListEmpty = crawls.length === 0;
          this.crawls = crawls;
          this.dataSource = new MatTableDataSource(crawls);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        } else {
          this.error = true;
        }

        this.cd.detectChanges();
      });
  }


  applyFilter(filterValue: string): void {
    filterValue = _.trim(filterValue);
    filterValue = _.toLower(filterValue);
    this.dataSource.filter = filterValue;
  }

  openAddCrawlerPagesDialog(e: Event, element: any) {
    e.preventDefault();
    const crawlDomainId = element.CrawlDomainId;
    const domainUri = element.DomainUri;
    const domainId = element.DomainId;
    this.dialog.open(AddCrawlerPagesDialogComponent, {
      width: '60vw',
      data: {
        crawlDomainId,
        domainUri,
        domainId
      }
    });
  }

  deleteCrawlerResult(e: Event, cdId: number) {
    e.preventDefault();
    this.deleteService.crawl(cdId)
      .subscribe(result => {
        if (result) {
          this.ngOnInit();
        } else {
          this.error = true;
        }
      });
  }

  substringSubdomain(subdomain: string): string {
    return subdomain.substring(subdomain.indexOf('/') + 1);
  }

  openCrawlerConfigDialog(): void {
    this.dialog.open(CrawlerConfigDialogComponent, {
      width: '60vw',
      disableClose: false,
      hasBackdrop: true
    });
  }

  goToDomainPage(): void {
    this.router.navigateByUrl('/console/domains');
  }

  openDeleteCrawlerDialog(): void {
    const crawlersId = this.selection.selected.map(c => c.CrawlDomainId);
    this.deleteService.crawlers({
      crawlDomainIds: JSON.stringify(crawlersId)
    }).subscribe(result => {
      if (result) {
        this.getListOfCrawls();
        this.selection = new SelectionModel<any>(true, []);
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
