import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { BlacklistRepository } from '@application/blacklist/blacklist.repository.interface';
import { BlacklistEntry, Strike } from '@domain/blacklist/blacklist-entry.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestBlacklistRepository implements BlacklistRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/blacklist`;

  getBlacklist(): Observable<BlacklistEntry[]> {
    return this.http.get<BlacklistEntry[]>(this.apiUrl);
  }

  getStrikes(phone: string): Observable<Strike[]> {
    return this.http.get<Strike[]>(`${this.apiUrl}/${phone}/strikes`);
  }

  async blockNumber(phone: string, reason?: string, alias?: string): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/block`, { phone, reason, alias })
    );
  }

  async unblockNumber(phone: string): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/unblock`, { phone })
    );
  }

  async addStrike(
    phone: string,
    reason?: string,
    appointmentId?: string,
    appointmentDate?: Date
  ): Promise<void> {
    await firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/${phone}/strikes`, {
        reason,
        appointmentId,
        appointmentDate,
      })
    );
  }

  async deleteStrike(phone: string, strikeId: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${phone}/strikes/${strikeId}`)
    );
  }

  async updateStrike(
    phone: string,
    strikeId: string,
    data: Partial<Strike>
  ): Promise<void> {
    await firstValueFrom(
      this.http.patch<void>(`${this.apiUrl}/${phone}/strikes/${strikeId}`, data)
    );
  }

  async resetStrikes(phone: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${phone}/strikes`)
    );
  }

  async updateEntry(phone: string, data: Partial<BlacklistEntry>): Promise<void> {
    await firstValueFrom(
      this.http.patch<void>(`${this.apiUrl}/${phone}`, data)
    );
  }

  async isBlocked(phone: string): Promise<boolean> {
    const res = await firstValueFrom(
      this.http.get<{ isBlocked: boolean }>(`${this.apiUrl}/${phone}/status`)
    );
    return res?.isBlocked ?? false;
  }
}
