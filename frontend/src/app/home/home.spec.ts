import { TestBed } from '@angular/core/testing';
import { NEVER, of } from 'rxjs';

import { Page } from '../models/page';
import { SalonService } from '../models/salon-service';
import { ServicesApiClient } from '../services/services-api-client';
import { Home } from './home';

describe('Home while loading', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: ServicesApiClient, useValue: { getServices: () => NEVER } }],
    }).compileComponents();
  });

  it('shows a loading message until the services arrive', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Loading services...');
    expect(text).not.toContain("Men's haircut");
    expect(text).not.toContain("Women's haircut");
  });
});

describe('Home', () => {
  const page: Page<SalonService> = {
    content: [
      { id: 1, name: "Men's haircut", description: null, basePrice: 14 },
      { id: 2, name: "Women's haircut", description: null, basePrice: 20 },
    ],
    page: { size: 10, number: 0, totalElements: 2, totalPages: 1 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: ServicesApiClient, useValue: { getServices: () => of(page) } }],
    }).compileComponents();
  });

  it('shows the services returned by the API', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Men's haircut");
    expect(text).toContain("Women's haircut");
    expect(text).toContain('€14.00');
    expect(text).toContain('€20.00');

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
  });
});
