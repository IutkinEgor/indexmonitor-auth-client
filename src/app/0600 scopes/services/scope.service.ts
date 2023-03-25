import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import * as fromScopeTypes from '../../0600 scopes/types/_index';
import * as fromSharedTypes from '../../0100 shared/types/_index';

@Injectable()
export class ScopeService {
    baseUrl = localStorage.getItem("issuer") + "/api/scopes";
    //baseUrl =  environment.authServer + "/api/scopes";
    defaultHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    config = { headers: this.defaultHeaders }

    constructor(private http: HttpClient) { }
    
    loadScopePage(page: number, size: number): Observable<fromSharedTypes.PageResponseInterface<fromScopeTypes.ScopePageInterface[]>>{
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<fromSharedTypes.PageResponseInterface<fromScopeTypes.ScopePageInterface[]>>(this.baseUrl, {params: params, headers: this.defaultHeaders});
    }
    loadScopeSettings(id: string): Observable<fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeSettingsInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeSettingsInterface>>(this.baseUrl + '/' + id, this.config);
    }
    loadScopeUsageByClients(id: string): Observable<fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeUsageByClientInterface[]>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromScopeTypes.ScopeUsageByClientInterface[]>>(this.baseUrl + '/' + id + '/clients', this.config);
    }
    registerScope(payload: fromScopeTypes.ScopeRegisterInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.post<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl, payload, this.config);
    }
    updateScopeSettings(id: string, payload: fromScopeTypes.ScopeUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + id, payload, this.config);
    }
    deleteScope(id: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + id, this.config);
    }
  
}