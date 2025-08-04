import { Injectable } from '@angular/core';
import apiClient from '../services/axios-client';
import { ApiResponse } from '../../interfaces/auth-response';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  async signIn(data: any) {
    const response = await apiClient.post('user/login', data)
    return response.data.data
  }

  async signUp(data: any) {
    const response: ApiResponse<User> = await apiClient.post('user/register', data)
    return response
  }
}
