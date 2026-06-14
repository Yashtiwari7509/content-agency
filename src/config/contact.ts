export const CONTACT_CONFIG = {
  /** Web3Forms access key — sign up at https://web3forms.com with your recipient email */
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "d810f316-e9bb-4b5f-ae21-2da67474c921",
  recipientEmail: import.meta.env.VITE_CONTACT_EMAIL ?? "hello@contentagency.com",
} as const;
