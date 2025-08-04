import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NonprofitResult } from '../../interfaces/nonprofit';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isSpinner = false
  notFound = false
  result: NonprofitResult | null = null;
  einGroup!: FormGroup
  constructor(private homeService: HomeService, private fb: FormBuilder) {
    this.einGroup = this.fb.group({
      ein: ['']
    });
  }

  async getNonProfit() {
    this.notFound = false
    this.result = null
    const einValue = this.einGroup.value.ein;
    if (!einValue) return;
    this.isSpinner = true
    try {
      const response = await this.homeService.getNonProfit(Number(einValue));
      this.isSpinner = false,
      this.result = response.data
    } catch (error) {
      this.isSpinner = false
      this.notFound = true
    }
  }
}
