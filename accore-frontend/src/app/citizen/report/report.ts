import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HazardReportService } from '../../services/hazard-report';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HlmButtonImports, HlmInputImports, HlmLabelImports],
  templateUrl: './report.html',
})
export class Report {
  private fb = inject(FormBuilder);
  private hazardReportService = inject(HazardReportService);

  reportForm: FormGroup = this.fb.group({
    category: ['', Validators.required],
    description: ['', Validators.required],
    latitude: [15.1450], 
    longitude: [120.5887]
  });
  
  selectedFile: File | null = null;
  isSubmitting = false;
  statusMessage = '';
  isError = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.reportForm.invalid || !this.selectedFile) {
      this.statusMessage = 'Please fill all required fields and select an image.';
      this.isError = true;
      return;
    }

    this.isSubmitting = true;
    this.statusMessage = '';
    this.isError = false;

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('category', this.reportForm.get('category')?.value);
    formData.append('description', this.reportForm.get('description')?.value);
    formData.append('latitude', this.reportForm.get('latitude')?.value);
    formData.append('longitude', this.reportForm.get('longitude')?.value);

    this.hazardReportService.submitReport(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.statusMessage = 'Report submitted successfully.';
        this.isError = false;
        this.reportForm.reset({ latitude: 15.1450, longitude: 120.5887 });
        this.selectedFile = null;
      },
      error: () => {
        this.isSubmitting = false;
        this.statusMessage = 'Failed to submit the report. Please try again.';
        this.isError = true;
      }
    });
  }
}