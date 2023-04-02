import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import * as fromClientTypes from '../../0500 clients/types/_index';
import * as fromSharedTypes from '../../0100 shared/types/_index';

@Injectable( 
    //{ providedIn: 'root' }
)
export class ClientService {
    baseUrl = localStorage.getItem("issuer") + "/api/clients";
    //baseUrl =  environment.authServer + "/api/clients";
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    config = { headers: this.headers }

    constructor(private http: HttpClient) { }
    
    loadClientSettings(id: string): Observable<fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientSettingsInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientSettingsInterface>>(this.baseUrl + '/' + id, this.config);
    }
    loadClientTokenSettings(id: string): Observable<fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTokenSettingsInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientTokenSettingsInterface>>(this.baseUrl + '/' +  id + '/token-settings', this.config);
    }
    loadClientScopes(id: string): Observable<fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientScopeInterface[]>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromClientTypes.ClientScopeInterface[]>>(this.baseUrl + '/' + id + '/scopes', this.config);
    }
    loadClientPage(page: number, size: number): Observable<fromSharedTypes.PageResponseInterface<fromClientTypes.ClientTableInterface[]>>{
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<fromSharedTypes.PageResponseInterface<fromClientTypes.ClientTableInterface[]>>(this.baseUrl, {params: params, headers: this.headers});
    }
    registerClient(client: fromClientTypes.ClientRegisterInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.post<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl, client,this.config);
    }
    updateClientSettings(id:string, payload: fromClientTypes.ClientSettingsUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + id, payload, this.config);
    }
    updateClientTokenSettings(id:string, payload: fromClientTypes.ClientTokenSettingsUpdateInterfcae): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + id + '/token-settings', payload, this.config);
    }
    addClientScopes(id:string, payload: fromClientTypes.ClientScopeUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + id + '/scopes', payload, this.config);
    }
    removeClientScopes(clientId:string, scopeId: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + clientId + '/scopes/' + scopeId, this.config);
    }
    deleteClient(clientId:string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + clientId, this.config);
    }
}