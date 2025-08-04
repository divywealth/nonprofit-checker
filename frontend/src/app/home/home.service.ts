import { Injectable } from '@angular/core';
import apiClient from '../services/axios-client';
import apiClientAuth from '../services/axios-client-header';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  async getNonProfit (data: number) {
    const response = await apiClientAuth.get(`nonprofit?ein=${data}`)
    return response.data.data
  }
}
