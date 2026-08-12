import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { AppointmentRepository } from '@application/appointments';
import { BusinessInfoRepository, ScheduleRepository } from '@application/business';
import { ServiceRepository } from '@application/services';
import { GalleryRepository } from '@application/gallery';
import { BlacklistRepository } from '@application/blacklist/blacklist.repository.interface';

import { RestAppointmentRepository } from '@infrastructure/rest/appointments/rest-appointment.repository';
import { RestBusinessInfoRepository } from '@infrastructure/rest/business/rest-business-info.repository';
import { RestScheduleRepository } from '@infrastructure/rest/business/rest-schedule.repository';
import { RestServiceRepository } from '@infrastructure/rest/services/rest-service.repository';
import { RestGalleryRepository } from '@infrastructure/rest/gallery/rest-gallery.repository';
import { RestBlacklistRepository } from '@infrastructure/rest/blacklist/rest-blacklist.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: AppointmentRepository, useClass: RestAppointmentRepository },
    { provide: BusinessInfoRepository, useClass: RestBusinessInfoRepository },
    { provide: ScheduleRepository, useClass: RestScheduleRepository },
    { provide: ServiceRepository, useClass: RestServiceRepository },
    { provide: GalleryRepository, useClass: RestGalleryRepository },
    { provide: BlacklistRepository, useClass: RestBlacklistRepository },
  ],
};
