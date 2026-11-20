import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../api-base-url';
import { ServicesApiClient } from './services-api-client';

describe('ServicesApiClient (against the real API)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        { provide: API_BASE_URL, useValue: 'http://localhost:8080/api/v1' },
      ],
    });
  });

  it('returns the first page of the sample services', async () => {
    const client = TestBed.inject(ServicesApiClient);

    const page = await firstValueFrom(client.getServices(0, 2));

    expect(page.content.length).toBe(2);
    expect(page.page.totalElements).toBe(6);
    expect(page.content[0].name).toBe("Men's haircut");
  });
});
