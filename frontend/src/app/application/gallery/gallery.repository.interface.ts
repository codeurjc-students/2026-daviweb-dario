import { Observable } from 'rxjs';
import { GalleryPhoto, PhotoType } from '@domain/index';

export interface UploadTaskLike extends Promise<any> {
  on(
    event: string,
    callback: (snapshot: { bytesTransferred: number; totalBytes: number }) => void
  ): void;
}

export abstract class GalleryRepository {
  abstract getPhotos(type: PhotoType): Observable<GalleryPhoto[]>;
  abstract uploadPhoto(file: File, photo: GalleryPhoto): UploadTaskLike;
  abstract deletePhoto(id: string, type: PhotoType): Promise<void>;
  abstract renamePhoto(
    photo: GalleryPhoto,
    newName: string
  ): Promise<GalleryPhoto>;
}
