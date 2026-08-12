import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ServiceRepository } from '@application/services';
import { Service, ServiceDTO } from '@domain/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestServiceRepository implements ServiceRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/services`;

  getServices(): Observable<ServiceDTO[]> {
    return this.http.get<ServiceDTO[]>(this.apiUrl);
  }

  async addService(service: Service): Promise<string> {
    const res = await firstValueFrom(
      this.http.post<{ id: string }>(this.apiUrl, service)
    );
    return res?.id || '';
  }

  async updateService(id: string, service: Service): Promise<void> {
    await firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/${id}`, service)
    );
  }

  async deleteService(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`)
    );
  }
}
