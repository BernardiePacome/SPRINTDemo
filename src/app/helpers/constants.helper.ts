export class ConstsHelper {
  static readonly FORM_REGEX = {
    EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    FIRST_NAME: '^[a-z\ A-Z]{2,50}$',
    LAST_NAME: '^[a-z\ A-Z]{2,50}$',
  }

  static readonly FORM_ERROR_MESSAGES = {
    email: {
      required: 'L\'email est obligatoire',
      pattern: 'L\'email n\'est pas valide',
      duplicate: 'L\'email est déjà utilisé',
    },
    firstName: {
      required: 'Le prénom est obligatoire',
      pattern: 'Le prénom doit être valide',
    },
    lastName: {
      required: 'Le nom est obligatoire',
      pattern: 'Le nom doit être valide',
    },
    birthDate: {
      required: 'La date de naissance est obligatoire',
      matDatepickerParse: 'La date de naissance doit être valide',
    }
  }
}
