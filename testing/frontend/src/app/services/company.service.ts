import { Injectable } from '@angular/core';
import { GlobalService} from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public Company: any;
  constructor(public _http: HttpClient) {
  this.url = GlobalService.url
  }

  login(company: any, getToken:any ): Observable<any>{
    if(getToken != null){
      company.getToken = getToken;
    }
    let params = JSON.stringify(company);
    return this._http.post(this.url + "login", params , {headers: this.headersVariable});
  }

  registroCompany(company: Company,  token: any): Observable<any>{
    let params = JSON.stringify(company);
    let headersToken = this.headersVariable.set("Authorization", token);

    return this._http.post(this.url + "registrarCompany", params, {headers: headersToken})
  }
  obtenerCompanys( token: any): Observable<any>{
    let headersToken = this.headersVariable.set("Authorization", token);

    return this._http.get(this.url + "obtenerCompanys", {headers: headersToken})
  }
  obtenerCompany(id: String, token: any): Observable<any>{
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.get(this.url +"obtenerCompanyID/" + id, {headers: headersToken})
  }

  editarCompany(company: Company, token: any): Observable<any>{
    let params = JSON.stringify(company);
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.put(this.url + "editarCompany", params , {headers: headersToken})
  }

  eliminarCompany(company: any): Observable<any>{
    let params = JSON.stringify(company);
    return this._http.post(this.url + "eliminarCompany", params, {headers: this.headersVariable})
  }

  getToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != "undefined"){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }




}
