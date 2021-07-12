import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SessionService } from './session.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FeraService {
  private http: HttpClient;
  private rootUrl = environment.feraApiPath;
  private getTokenPath = '/token';
  private renewTokenPath = '/token/renew';
  private authorizePath = '/authorize';
  private authorizeBackofficePath = '/authorize/backoffice';
  private authorizeAgencyPath = '/authorize/agency';
  private profilePath = '/profile';
  private sendQRPath = '/profile/sendemail';
  private fileStagePath = '/file';
  private bybPath = '/byb';
  private scriptGuidePath = '/scriptguide';
  private faqPath = '/faq';

  private countGetToken = 0;
  private countRefreshToken = 0;

  constructor(private sessionService: SessionService, private injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getToken = (authCode:string, callback: Function, fresh: boolean = false) => {
    console.info("getToken");

    if (fresh) this.countGetToken = 0;
    else this.countGetToken++;

    if (this.countGetToken >= 3) {
      var router = this.injector.get(Router);
      router.navigateByUrl('/');
    }

    //$('#awaiting').show();
    let resp = this.http.get(environment.feraApiPath + this.getTokenPath + '/' + authCode, { responseType: 'text' })
    resp.subscribe((data: string) => {
      if (data !== undefined && data !== null && data.length > 0) {
        callback(data);
        //$('#awaiting').hide();
        return;
      }
      this.getToken(authCode, callback);
      //$('#awaiting').hide();
    },
    error => {
      this.getToken(authCode, callback);
      //$('#awaiting').hide();
    });
  }

  getProfile = (callback: Function, fresh: boolean = false): void => {
    console.info("getProfile");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }

    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.profilePath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.getProfile(callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
      console.info('fera get profile error');
    });
  }

  getAuthorize = (callback: Function, fresh: boolean = false): void => {
    console.info("getAuthorize");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(0);
      return;
    }

    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.authorizePath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data != null) {
        if (data.code !== undefined && data.code != null) {
          if (data.code == 401001) {
            var $this = this;
            this.refreshToken(function() { $this.getAuthorize(callback); }, fresh);
            return;
          }
          callback(0);
          //$('#awaiting').hide();
          return;
        }

        callback(data.isBackOffice ? 1 : 2);
        //$('#awaiting').hide();
        return;
      }
      callback(0);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(0);
      //$('#awaiting').hide();
    });
  }

  getAuthorizeBackoffice = (callback: Function, fresh: boolean = false): void => {
    console.info("getAuthorizeBackoffice");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.authorizeBackofficePath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      console.info(data);
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.getAuthorizeBackoffice(callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }
      
      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  getAuthorizeAgency = (callback: Function, fresh: boolean = false): void => {
    console.info("getAuthorizeAgency");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.authorizeAgencyPath, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.getAuthorizeAgency(callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  emailQRUId = (emailAddr: string, callback: Function, fresh: boolean = false): void => {
    console.info("sendEmail");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.post(environment.feraApiPath + this.sendQRPath, { email: emailAddr }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.emailQRUId(emailAddr, callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  putFileInStage = (form: FormData, callback: Function, fresh: boolean = false): void => {
    console.info("putFileInStage");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }

    //$('#awaiting').show();
    this.http.post(environment.feraApiPath + this.fileStagePath, form, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.putFileInStage(form, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  searchByb = (keywords: string, businessChannel: number, careerSegment: number, active: boolean, sort: number, callback: Function, fresh: boolean = false): void => {
    console.info("searchByb");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    var query = '';
    if (keywords !== null && keywords.length > 0) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'keywords=' + keywords;
    }
    if (businessChannel !== undefined && businessChannel !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'businessChannel=' + businessChannel;
    }
    if (careerSegment !== undefined && careerSegment !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'careerSegment=' + careerSegment;
    }
    if (!active) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'activeRecords=' + false;
    }
    if (sort !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'sorting=' + sort;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.bybPath + query, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined && data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.searchByb(keywords, businessChannel, careerSegment, active, sort, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  getByb = (id: number, callback: Function, fresh: boolean = false): void => {
    console.info("getByb");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.bybPath + '/' + id, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined && data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.getByb(id, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  addByb = (title: string, description: string, businessChannel: number, contentType: number, careerSegment: number, 
            enFileId: string, enUrl: string, msFileId: string, msUrl: string,
            callback: Function, fresh: boolean = false): void => {
    console.info("addByb");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }
    
    //$('#awaiting').show();
    this.http.post(environment.feraApiPath + this.bybPath, { 
      title: title, description: description, businessChannel: businessChannel, contentType: contentType, careerSegment:careerSegment, 
      enFileId: enFileId, enUrl: enUrl, msFileId: msFileId, msUrl: msUrl 
    }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined || data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.addByb(title, description, businessChannel, contentType, careerSegment, enFileId, enUrl, msFileId, msUrl, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data?.id);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  updateByb = (id: number, title: string, description: string, businessChannel: number, contentType: number, careerSegment: number, 
              enFileId: string, enUrl: string, msFileId: string, msUrl: string,
              callback: Function, fresh: boolean = false): void => {
    console.info("updateByb");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }
    
    //$('#awaiting').show();
    this.http.patch(environment.feraApiPath + this.bybPath + '/' + id, { title: title, description: description, businessChannel: businessChannel, contentType: contentType, careerSegment: careerSegment, 
      enFileId: enFileId, enUrl: enUrl, msFileId: msFileId, msUrl: msUrl }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined || data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.updateByb(id, title, description, businessChannel, contentType, careerSegment, enFileId, enUrl, msFileId, msUrl, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data?.id);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  archiveByb = (id: number, callback: Function, fresh: boolean = false): void => {
    console.info("archiveByb");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.delete(environment.feraApiPath + this.bybPath + '/' + id, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.archiveByb(id, callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  searchScriptGuide = (keywords: string, businessChannel: number, language: number, active: boolean, sort: number, callback: Function, fresh: boolean = false): void => {
    console.info("searchScriptGuide");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    var query = '';
    if (keywords !== null && keywords.length > 0) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'keywords=' + keywords;
    }
    if (businessChannel !== undefined && businessChannel !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'businessChannel=' + businessChannel;
    }
    if (language !== undefined && language !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'language=' + language;
    }
    if (!active) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'activeRecords=' + false;
    }
    if (sort !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'sorting=' + sort;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.scriptGuidePath + query, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined && data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.searchScriptGuide(keywords, businessChannel, language, active, sort, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  getScriptGuide = (id: number, callback: Function, fresh: boolean = false): void => {
    console.info("getScriptGuide");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.scriptGuidePath + '/' + id, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined && data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.getScriptGuide(id, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  addScriptGuide = (title: string, description: string, businessChannel: number, language: number, fileId: string, callback: Function, fresh: boolean = false): void => {
    console.info("addScriptGuide");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }
    
    //$('#awaiting').show();
    this.http.post(environment.feraApiPath + this.scriptGuidePath, { title: title, description: description, businessChannel: businessChannel, language: language, fileId: fileId }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined || data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.addScriptGuide(title, description, businessChannel, language, fileId, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data?.id);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  updateScriptGuide = (id: number, title: string, description: string, businessChannel: number, language: number, fileId: string, callback: Function, fresh: boolean = false): void => {
    console.info("updateScriptGuide");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(null);
      return;
    }

    //$('#awaiting').show();
    this.http.patch(environment.feraApiPath + this.scriptGuidePath + '/' + id, { title: title, description: description, businessChannel: businessChannel, language: language, fileId: fileId }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined || data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.updateScriptGuide(id, title, description, businessChannel, language, fileId, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data?.id);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  archiveScriptGuide = (id: number, callback: Function, fresh: boolean = false): void => {
    console.info("archiveScriptGuide");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.delete(environment.feraApiPath + this.scriptGuidePath + '/' + id, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.archiveScriptGuide(id, callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  searchFAQ = (keywords: string, active: boolean, sort: number, callback: Function, fresh: boolean = false): void => {
    console.info("searchFAQ");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    var query = '';
    if (keywords !== null && keywords.length > 0) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'keywords=' + keywords;
    }
    if (!active) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'activeRecords=' + false;
    }
    if (sort !== null) {
      if (query.length == 0) query += '?';
      else query += '&';
      query += 'sorting=' + sort;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.faqPath + query, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data === undefined && data === null) {
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      if (data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.searchFAQ(keywords, active, sort, callback); }, fresh);
          return;
        }
        callback(null);
        //$('#awaiting').hide();
        return;
      }

      callback(data);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(null);
      //$('#awaiting').hide();
    });
  }

  addFAQ = (question: string, answer: string, callback: Function, fresh: boolean = false): void => {
    console.info("addFAQ");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.post(environment.feraApiPath + this.faqPath, { question: question, answer: answer}, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.addFAQ(question, answer, callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }
  
  updateFAQ = (id: number, question: string, answer: string, callback: Function, fresh: boolean = false): void => {
    console.info("updateFAQ");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.patch(environment.feraApiPath + this.faqPath + '/' + id, { question: question, answer: answer }, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.updateFAQ(id, question, answer, callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  archiveFAQ = (id: number, callback: Function, fresh: boolean = false): void => {
    console.info("archiveFAQ");
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      callback(false);
      return;
    }

    //$('#awaiting').show();
    this.http.delete(environment.feraApiPath + this.faqPath + '/' + id, { 
      responseType: 'json',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: any) => {
      if (data !== undefined && data !== null && data.code !== undefined && data.code !== null) {
        if (data.code == 401001) {
          var $this = this;
          this.refreshToken(function() { $this.archiveFAQ(id, callback); }, fresh);
          return;
        }
        callback(false);
        //$('#awaiting').hide();
        return;
      }

      callback(true);
      //$('#awaiting').hide();
    },
    error => {
      console.info(error);
      callback(false);
      //$('#awaiting').hide();
    });
  }

  refreshToken(callback: Function, fresh: boolean = false): void {
    console.info("refreshToken");

    if (fresh) this.countRefreshToken = 0;
    else this.countRefreshToken++;

    if (this.countRefreshToken >= 3) {
      var router = this.injector.get(Router);
      this.sessionService.logout();
      router.navigateByUrl('/');
      //$('#awaiting').hide();
      return;
    }
    let idToken = sessionStorage.getItem("idToken");
    if (idToken === undefined || idToken === null) {
      var router = this.injector.get(Router);
      this.sessionService.logout();
      router.navigateByUrl('/');
      //$('#awaiting').hide();
      return;
    }
    
    //$('#awaiting').show();
    this.http.get(environment.feraApiPath + this.renewTokenPath, { 
      responseType: 'text',
      headers: new HttpHeaders().set('Authorization',  `Bearer ${idToken}`).set('X-App-Id', '345678')
    }).subscribe((data: string) => {
      if (data !== undefined && data !== null && data.length > 0) {
        sessionStorage.setItem("idToken", data);
        callback();
        return;
      }
      var $this = this;
      setTimeout(function() {
        $this.refreshToken(callback);
      }, this.countRefreshToken * 500);
    },
    error => {
      var $this = this;
      setTimeout(function() {
        $this.refreshToken(callback);
      }, this.countRefreshToken * 500);
    });
  }
}