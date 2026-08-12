import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ScheduleRepository } from '@application/business';
import { ScheduleDay, ExceptionItem } from '@domain/index';
import { ReservedSlot } from '@domain/business-info/availability/reservedSlots.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestScheduleRepository implements ScheduleRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/schedule`;

  getSchedule(): Observable<ScheduleDay[]> {
    return this.http.get<ScheduleDay[]>(this.apiUrl);
  }

  async updateSchedule(schedule: ScheduleDay[]): Promise<void> {
    await firstValueFrom(this.http.put<void>(this.apiUrl, schedule));
  }

  getExceptions(): Observable<ExceptionItem[]> {
    return this.http.get<ExceptionItem[]>(`${this.apiUrl}/exceptions`);
  }

  async addException(exception: ExceptionItem): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/exceptions`, exception)
    );
  }

  async updateException(id: string, exception: ExceptionItem): Promise<void> {
    await firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/exceptions/${id}`, exception)
    );
  }

  async deleteException(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/exceptions/${id}`)
    );
  }

  getSlots(): Observable<ReservedSlot[]> {
    return this.http.get<ReservedSlot[]>(`${this.apiUrl}/slots`);
  }

  async addSlot(slot: ReservedSlot): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/slots`, slot)
    );
  }

  async deleteSlot(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/slots/${id}`)
    );
  }
}
