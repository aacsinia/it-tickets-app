import {Component, ElementRef, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {TicketService} from "./services/ticket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('downloadAnchor') downloadAnchor: ElementRef;

  exportStatus: ExportStatus;
  downloadLink = '';

  constructor(public ticketService: TicketService, private renderer: Renderer) {

  }

  ngOnInit(): void {

  }

  public exportTickets() {
    this.exportStatus = new ExportStatus(0, 0);
    const that = this;
    that.ticketService.startExport().subscribe(
      startExportResponse => {
        setTimeout(function () {
          that.openDownloadWindow(startExportResponse.id);
        });

        const repeater = setInterval(function () {
          that.ticketService.getExportStatus(startExportResponse.id).subscribe(
            exportStatusResponse => {
              that.exportStatus.max = exportStatusResponse.total;
              that.exportStatus.value = exportStatusResponse.current;
              that.exportStatus.error = exportStatusResponse.error;
              if (exportStatusResponse.error) {
                console.log('Server side export error', exportStatusResponse.error);
                clearInterval(repeater);
              } else if (exportStatusResponse.current >= exportStatusResponse.total) {
                console.log('Download complete');
                clearInterval(repeater);
              }
            },
            error => {
              console.log('Cannot get export status', error);
              clearInterval(repeater);
              that.exportStatus.error = 'Download error.'
            })
        }, 500);

      }, error => {
        console.log('Cannot start export status', error);
        that.exportStatus.error = 'Cannot start export.'
      }
    );

  }

  private openDownloadWindow(exportId: number) {
    this.downloadLink = `${TicketService.TICKET_API_URL}/export/` + exportId;
    console.log('open download window:', this.downloadLink, this.downloadAnchor, this.downloadAnchor.nativeElement);
    this.downloadAnchor.nativeElement.setAttribute('href', this.downloadLink);
    this.downloadAnchor.nativeElement.click();
  }
}

class ExportStatus {
  max: number;
  value: number;
  error: string;


  constructor(max: number, value: number) {
    this.max = max;
    this.value = value;
  }
}
