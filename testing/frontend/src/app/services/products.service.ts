import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CompanyService } from './company.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public url: String;
  public token: any;
  public identidad: any;
  public product: any;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient, public _empresaService: CompanyService) {
    this.url = GlobalService.url , this.token = this._empresaService.getToken(); }

  registroProduct(product: Product, token: any): Observable<any>{
    let params = JSON.stringify(product);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.post(this.url + "registrarProduct", params , {headers: headersToken})
  }
  verProducts(): Observable<any>{
    let headersToken = this.headersVariable.set("Authorization", this.token);
    return this._http.get(this.url + "verProducts",  {headers: headersToken});

  }
  obtenerProduct(id: String, token: any): Observable<any>{
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.get(this.url +"obtenerProduct/" + id, {headers: headersToken})
  }
  editarProduct(product: Product, token: any): Observable<any>{
    let params = JSON.stringify(product);
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.put(this.url + "editarProduct", params , {headers: headersToken})
  }

  eliminarProduct(product: any): Observable<any>{
    let params = JSON.stringify(product);
    return this._http.post(this.url + "eliminarProductNombre", params, {headers: this.headersVariable})
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
  getProducts(){
    var product2 = JSON.parse(localStorage.getItem("empleadoSeleccionado")||"{}");
    if(product2 != "undefined"){
      this.product = product2;
    }else {
      this.product = null;
    }
    return this.product;
  }
}
