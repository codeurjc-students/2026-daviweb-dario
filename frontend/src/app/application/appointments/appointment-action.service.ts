import { inject, Injectable } from '@angular/core';
import { Appointment, AppointmentDTO } from '@domain/appointments';
import { AppointmentRepository } from './appointment.repository.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentActionService {
  private appointmentRepo = inject(AppointmentRepository);

  /**
   * Find an appointment by its cancellation token
   */
  async findByToken(encodedToken: string): Promise<Appointment | null> {
    try {
      const base64 = encodedToken.replace(/-/g, '+').replace(/_/g, '/');
      const tokenData = JSON.parse(atob(base64));

      const { a: appointmentId, e: expiresAt } = tokenData;

      if (Date.now() > expiresAt) {
        console.warn(
          '⚠️ Enlace de cancelación expirado (debe cancelar con 24h de antelación)'
        );
        return null;
      }

      return await firstValueFrom(this.appointmentRepo.getAppointmentById(appointmentId));
    } catch (error) {
      console.error('❌ Error decodificando token:', error);
      return null;
    }
  }

  /**
   * Cancela una cita por su ID
   */
  async cancel(appointmentId: string): Promise<void> {
    try {
      await this.appointmentRepo.deleteAppointment(appointmentId);
      console.log(`✅ Cita ${appointmentId} cancelada`);
    } catch (error) {
      console.error('❌ Error cancelando cita:', error);
      throw error;
    }
  }
}
