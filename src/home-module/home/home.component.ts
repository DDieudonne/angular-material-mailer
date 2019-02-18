import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SendemailService } from '../../app/sendemail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emailArray: any[] = [];
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  emailForm: FormGroup;
  emailArrayControl: FormControl;
  objectControl: FormControl;
  messageControl: FormControl;

  addedEmail: boolean;
  loadingState: boolean;

  constructor(
    public toastr: ToastrService,
    public builder: FormBuilder,
    public sendemailService: SendemailService
  ) { }

  ngOnInit() {

    this.emailArrayControl = new FormControl('', Validators.required);
    this.objectControl = new FormControl('', Validators.required);
    this.messageControl = new FormControl('', Validators.required);

    this.emailForm = this.builder.group({
      emailArrayControl: this.emailArrayControl,
      objectControl: this.objectControl,
      messageControl: this.messageControl,
    });


  }

  add(event: MatChipInputEvent): void {

    let email: any = event.value;

    if (this.emailPattern.test(email)) {
      const input = event.input;
      const value = event.value;
      value.trim() ? this.emailArray.push(value.trim()) : null;
      input ? input.value = '' : null;
      this.addedEmail = true;
    } else if (!this.emailPattern.test(email) && email.trim()) {
      this.toastr.error('Veuillez entrer une adresse email valide svp', 'Erreur');
    }

  }

  remove(email: any): void {
    const index = this.emailArray.indexOf(email);
    index >= 0 ? this.emailArray.splice(index, 1) : null;
    this.emailArray.length == 0 ? this.addedEmail = false : null;
  }

  emailFormFunction(emailForm: FormGroup) {

    this.loadingState = true;

    let dataSent;

    dataSent = {
      emails: this.emailArray.toString(),
      subject: emailForm.value.objectControl,
      message: emailForm.value.messageControl
    };

    this.emailArray.splice(0);
    emailForm.reset();

    this.sendemailService.sendToEmail(dataSent).subscribe(data => {
      this.toastr.success("Votre mail a été envoyé", 'Envoyé!');
      this.loadingState = false;
    }, error => {
      this.toastr.error("Erreur de serveur votre message n'a pas été envoyé", 'Erreur');
    });

  }

}
