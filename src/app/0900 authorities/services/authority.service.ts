import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import * as fromAuthorityTypes from '../../0900 authorities/types/_index';
import * as fromSharedTypes from '../../0100 shared/types/_index';

@Injectable()
export class AuthorityService {
    baseUrl = localStorage.getItem("issuer") + "/api/authorities";
    //baseUrl =  environment.authServer + "/api/authorities";
    defaultHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    config = { headers: this.defaultHeaders }

    constructor(private http: HttpClient) { }
    
    loadAuthorityPage(page: number, size: number): Observable<fromSharedTypes.PageResponseInterface<fromAuthorityTypes.AuthorityPageInterface[]>>{
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<fromSharedTypes.PageResponseInterface<fromAuthorityTypes.AuthorityPageInterface[]>>(this.baseUrl, {params: params, headers: this.defaultHeaders});
    }
    loadAuthoritySettings(AuthorityId: string): Observable<fromSharedTypes.BaseResponseInterface<fromAuthorityTypes.AuthoritySettingsInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromAuthorityTypes.AuthoritySettingsInterface>>(this.baseUrl + '/' + AuthorityId, this.config);
    }
    loadAuthorityUsageByUsers(AuthorityId: string): Observable<fromSharedTypes.BaseResponseInterface<fromAuthorityTypes.AuthorityUsageByUsersInterface[]>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromAuthorityTypes.AuthorityUsageByUsersInterface[]>>(this.baseUrl + '/' + AuthorityId + '/users', this.config);
    }
    registerAuthority(payload: fromAuthorityTypes.AuthorityRegisterInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.post<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl, payload, this.config);
    }
    updateAuthoritySettings(AuthorityId: string, payload: fromAuthorityTypes.AuthoritySettingsUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + AuthorityId, payload, this.config);
    }
    deleteAuthority(AuthorityId: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + AuthorityId, this.config);
    }
  
}