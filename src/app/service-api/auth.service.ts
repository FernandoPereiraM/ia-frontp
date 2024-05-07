import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PredictionModel } from '../models/prediction.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * The base URL for the API of backEnd.
   * @private
   */
  private apiUrl = 'http://127.0.0.1:8000/';
  formDataPrediction: PredictionModel = new PredictionModel();

  constructor(private http: HttpClient) {}

  /**
   * Sends a POST request to create a new user.
   * @param imageFile - The image file to be posted.
   * @returns {Observable<any>} - An observable of the HTTP response.
   */
  postImage(imageFile: File) {
    const formData = new FormData();
    formData.append('file', imageFile);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post<PredictionModel>(`${this.apiUrl}`, formData, {
      headers,
    });
  }
}
