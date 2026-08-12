import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { GalleryRepository, UploadTaskLike } from '@application/gallery/gallery.repository.interface';
import { GalleryPhoto, PhotoType } from '@domain/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestGalleryRepository implements GalleryRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/gallery`;

  getPhotos(type: PhotoType): Observable<GalleryPhoto[]> {
    return this.http.get<GalleryPhoto[]>(`${this.apiUrl}?type=${type}`);
  }

  uploadPhoto(file: File, photo: GalleryPhoto): UploadTaskLike {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', photo.name);
    formData.append('type', photo.type);

    let progressCallback: ((snapshot: { bytesTransferred: number; totalBytes: number }) => void) | null = null;

    const req = new HttpRequest('POST', `${this.apiUrl}/upload`, formData, {
      reportProgress: true,
    });

    const promise = new Promise<any>((resolve, reject) => {
      this.http.request(req).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            if (progressCallback) {
              progressCallback({
                bytesTransferred: event.loaded,
                totalBytes: event.total,
              });
            }
          } else if (event.type === HttpEventType.Response) {
            resolve({
              ref: {
                fullPath: `${this.apiUrl}/files/${photo.name}`,
              },
              ...(event.body && typeof event.body === 'object' ? event.body : {}),
            });
          }
        },
        error: (err) => reject(err),
      });
    });

    (promise as UploadTaskLike).on = (
      event: string,
      callback: (snapshot: { bytesTransferred: number; totalBytes: number }) => void
    ) => {
      if (event === 'state_changed') {
        progressCallback = callback;
      }
    };

    return promise as UploadTaskLike;
  }

  async deletePhoto(id: string, type: PhotoType): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}?type=${type}`)
    );
  }

  async renamePhoto(photo: GalleryPhoto, newName: string): Promise<GalleryPhoto> {
    return await firstValueFrom(
      this.http.patch<GalleryPhoto>(`${this.apiUrl}/${photo.id}/rename`, { name: newName })
    );
  }
}
