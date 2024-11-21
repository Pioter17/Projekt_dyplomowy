import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { AuthService } from '@core/services/auth.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  path = `${RoutesPath.AUTH}/${RoutesPath.LOGIN}`;
  error = false;

  register() {
    if (this.form.valid) {
      this.authService
        .register(this.form.value['name'], this.form.value['password'])
        .subscribe((res) => {
          if (res.isSuccess) {
            this.router.navigate([RoutesPath.HOME]);
          } else {
            this.error = true;
            this.cdr.detectChanges();
          }
        });
    }
  }
}
