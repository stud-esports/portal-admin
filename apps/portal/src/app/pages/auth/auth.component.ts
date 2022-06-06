import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';

@UntilDestroy()
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this._formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this._authService
      .signIn(this.validateForm.value)
      .pipe(
        catchError((res) => {
          this._messageService.create('error', res.error.message);
          return EMPTY;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
