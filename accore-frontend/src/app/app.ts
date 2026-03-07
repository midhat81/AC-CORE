import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonImports, HlmInputImports, HlmLabelImports],
  templateUrl: './app.html',
})
export class App {
  title = 'accore-frontend';
}