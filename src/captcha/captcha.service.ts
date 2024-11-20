import { Injectable } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  private captchaServerUrl = `http://${process.env.CAPTCHA_SERVER_HOST}:5000/captcha/predict`;

  async sendRecognizeRequest(formData: FormData) {
    return fetch(this.captchaServerUrl, {
      method: 'POST',
      body: formData,
    }).then((r) => {
      if (!r.ok) {
        throw new Error('Failed to upload image');
      }
      return r.text();
    });
  }
}
