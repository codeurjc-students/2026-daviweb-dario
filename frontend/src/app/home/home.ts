import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ServicesApiClient } from '../services/services-api-client';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe],
  templateUrl: './home.html'
})
export class Home {
  private readonly servicesApiClient = inject(ServicesApiClient);

  protected readonly services = toSignal(this.servicesApiClient.getServices());
}
