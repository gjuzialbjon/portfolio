import { Component, OnInit } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '@env/environment'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [],
})
export class ContactComponent implements OnInit {
  contactForm: UntypedFormGroup
  sending = false

  statuses = [{ status: 'success' }, { status: 'error' }, { status: 'info' }, { status: 'msg' }]

  status: any = null

  constructor(private _fb: UntypedFormBuilder, private http: HttpClient, private router: Router) {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.status = null
        this.contactForm.reset()
      }
    })
  }

  onSendMessage() {
    if (this.contactForm.invalid) {
      this.name.markAsDirty()
      this.email.markAsDirty()
      this.message.markAsDirty()
      this.startSendAnimation(false)
      this.status = this.statuses[3]

      setTimeout(() => {
        this.status = null
      }, 1500)
      return
    }

    this.status = this.statuses[2]

    const email = this.contactForm.value
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    this.http
      .post(environment.formspree, { name: email.name, replyto: email.email, message: email.message }, { headers: headers })
      .subscribe(
        (response) => {
          this.startSendAnimation()
        },
        (err) => {
          console.error(err)
          this.startSendAnimation(false)
          this.status = this.statuses[1]
        }
      )

    this.contactForm.reset()
  }

  get name() {
    return this.contactForm.controls.name
  }
  get email() {
    return this.contactForm.controls.email
  }
  get message() {
    return this.contactForm.controls.message
  }

  startSendAnimation(valid = true) {
    this.sending = true

    const form = document.getElementById('contact-form') as HTMLElement
    form.classList.add(valid ? 'message-sending' : 'message-not-sending')

    if (valid) {
      setTimeout(() => {
        form.classList.remove('message-sending')
        this.sending = false
        this.status = this.statuses[0]
      }, 3000)

      setTimeout(() => {
        this.status = null
      }, 5000)
    } else {
      setTimeout(() => {
        form.classList.remove('message-not-sending')
        this.sending = false
      }, 1500)
    }
  }
}
