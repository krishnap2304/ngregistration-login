import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule} from '@angular/common/http'
import {catchError, map, tap, retry} from 'rxjs/operators'
import { URLSearchParams } from 'url';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class Ngrecpatcha3servcieService {

  private baseUrl = 'https://www.google.com/recaptcha/api.js';
  private siteKey = '6LeZmfEaAAAAACBI5Ld-TPg6uhRMkZ6foarbHk0U';
  private isLoaded: Boolean = false;
  private scriptId;


  public init(siteKey: string) {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        resolve('success');
        return;
      } else {
        this.siteKey = siteKey;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = this.baseUrl + `?render=${this.siteKey}&onload=ngRecaptcha3Loaded`;
        script.id = `recapthcha-${this.scriptId}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          resolve('success');
        }
        script.onerror = () => {
          reject('error');
        };
        document.head.appendChild(script);
      }

    });

  }

  public constructor() {
    window["ngRecaptcha3Loaded"] = () => {
      this.isLoaded = true;
    };
    this.scriptId = +(new Date());
  }

  public getToken(action?: any): Promise<any> {
    var grecaptcha;
    try {
      return window['grecaptcha'].execute(this.siteKey, action);
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }

  public destroy(){
    this.isLoaded=false;
    const script = document.getElementById('$recaptcha-${this.scriptId}');
    if (script){
      script.remove();
    }
    const badge = document.getElementsByClassName('grecaptcha-badge')[0];
    if (badge){
      badge.remove();
    }
    }
}
