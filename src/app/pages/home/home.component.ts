import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize EmailJS
    emailjs.init('tQbdbba-V_KVGJ4dE'); 

    // Initialize Form Group
    this.contactForm = this.fb.group({
      fromName: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const { fromName, subject, message } = this.contactForm.value;

      const templateParams = {
        from_name: fromName,
        subject: subject,
        message: message,
      };
      
      emailjs
        .send("service_5yp8see","template_ud0m9un", templateParams) // Replace IDs
        .then(
          (response: EmailJSResponseStatus) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            this.contactForm.reset();
          },
          (error) => {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
          }
        );
    }
  }
}