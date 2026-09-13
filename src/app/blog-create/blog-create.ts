import { Component, signal } from '@angular/core';
import {
  FormField,
  form,
  maxLength,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [FormField],
  templateUrl: './blog-create.html',
  styleUrl: './blog-create.scss',
})
export class BlogCreateComponent {
  // MODEL
  readonly blogModel = signal({
    title: '',
    content: '',
    category: 'general',
  });

  // FORM + VALIDATION
  readonly blogForm = form(this.blogModel, (s) => {
    required(s.title, {
      message: 'Titel ist erforderlich',
    });

    minLength(s.title, 3, {
      message: 'Titel muss mindestens 3 Zeichen lang sein',
    });

    maxLength(s.title, 100, {
      message: 'Titel darf maximal 100 Zeichen lang sein',
    });

    required(s.content, {
      message: 'Inhalt ist erforderlich',
    });

    minLength(s.content, 10, {
      message: 'Inhalt muss mindestens 10 Zeichen lang sein',
    });

    required(s.category, {
      message: 'Kategorie ist erforderlich',
    });

    // Custom Validator:
    // Nur Buchstaben, Zahlen, Leerzeichen und Umlaute
    validate(s.title, ({ value }) => {
      const title = value();

      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]*$/.test(title)) {
        return {
          kind: 'specialCharacters',
          message: 'Titel darf nur Buchstaben, Zahlen und Leerzeichen enthalten',
        };
      }

      return null;
    });

    // Cross-Field Validator:
    // Content mindestens doppelt so lang wie Titel
    validate(s.content, ({ value, valueOf }) => {
      const content = value();
      const title = valueOf(s.title);

      if (content.length < title.length * 2) {
        return {
          kind: 'contentTooShort',
          message: 'Inhalt muss mindestens doppelt so lang wie der Titel sein',
        };
      }

      return null;
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.blogForm, async () => {
      console.log('Blog:', this.blogModel());
    });
  }
}
