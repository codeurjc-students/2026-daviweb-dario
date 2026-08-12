import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { BusinessInfoRepository } from '@application/business';
import { ContactInfo, BarberSettings, Barber } from '@domain/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestBusinessInfoRepository implements BusinessInfoRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/business-info`;

  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(`${this.apiUrl}/contact`);
  }

  async updateContactInfo(contactInfo: ContactInfo): Promise<void> {
    await firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/contact`, contactInfo)
    );
  }

  getBarberSettings(): Observable<BarberSettings> {
    return this.http.get<BarberSettings>(`${this.apiUrl}/barbers/settings`);
  }

  async updateBarberSettings(settings: BarberSettings): Promise<void> {
    await firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/barbers/settings`, settings)
    );
  }

  async updateBarberSelection(value: boolean): Promise<void> {
    await firstValueFrom(
      this.http.patch<void>(`${this.apiUrl}/barbers/selection`, { selectionEnabled: value })
    );
  }

  async addBarber(barber: Barber): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/barbers`, barber)
    );
  }

  async removeBarber(barber: Barber): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/barbers/${barber.id}`)
    );
  }

  async editBarber(newBarber: Barber): Promise<void> {
    await firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/barbers/${newBarber.id}`, newBarber)
    );
  }
}
