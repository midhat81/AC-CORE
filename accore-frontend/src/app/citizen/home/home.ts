import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HlmButtonImports],
  templateUrl: './home.html',
})
export class Home {}