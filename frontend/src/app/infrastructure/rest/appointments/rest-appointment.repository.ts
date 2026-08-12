import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, of } from 'rxjs';
import { AppointmentRepository } from '@application/appointments';
import { Appointment } from '@domain/appointments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestAppointmentRepository implements AppointmentRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/appointments`;

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: string): Observable<Appointment | null> {
    return this.http.get<Appointment | null>(`${this.apiUrl}/${id}`);
  }

  getAppointmentsByDate(date: Date): Observable<Appointment[]> {
    const isoDate = date.toISOString().split('T')[0];
    return this.http.get<Appointment[]>(`${this.apiUrl}?date=${isoDate}`);
  }

  getAppointmentsByDateRange(startDate: Date, endDate: Date): Observable<Appointment[]> {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    return this.http.get<Appointment[]>(`${this.apiUrl}?startDate=${start}&endDate=${end}`);
  }

  async addAppointment(appointment: Appointment): Promise<string> {
    const response = await firstValueFrom(
      this.http.post<{ id: string }>(this.apiUrl, appointment)
    );
    return response?.id || '';
  }

  async updateAppointment(id: string, appointment: Appointment): Promise<void> {
    await firstValueFrom(this.http.put<void>(`${this.apiUrl}/${id}`, appointment));
  }

  async deleteAppointment(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
