import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api-base-url';
import { Page } from '../models/page';
import { SalonService } from '../models/salon-service';

@Injectable({ providedIn: 'root' })
export class ServicesApiClient {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getServices(page = 0, size = 10): Observable<Page<SalonService>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<SalonService>>(`${this.baseUrl}/services`, { params });
  }
}
