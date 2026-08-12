import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TenantConfig } from '../domain/saas/tenant.config';
import { SAAS_CONFIG } from './saas.config';

@Injectable({
  providedIn: 'root'
})
export class SaasConfigService {
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  private get config(): TenantConfig {
    return SAAS_CONFIG;
  }

  /**
   * Obtiene la configuración completa
   */
  getAll(): TenantConfig {
    return this.config;
  }

  getDDBBPaths() {
    return this.config.database.collections;
  }

  getDDBBStoragePaths() {
    return this.config.database.storage;
  }
}
