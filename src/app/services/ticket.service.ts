import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TicketService {

  static TICKET_API_URL = `${environment.apiUrl}/tickets`;

  constructor(private http: Http) {
  }

  startExport(): Observable<any> {
    return this.http.get(`${TicketService.TICKET_API_URL}/export`)
      .map((response: Response) => response.json());
  }

  getExportStatus(exportId: number): Observable<any> {
    return this.http.get(`${TicketService.TICKET_API_URL}/export/${exportId}/status`)
      .map((response: Response) => response.json());
  }
}
