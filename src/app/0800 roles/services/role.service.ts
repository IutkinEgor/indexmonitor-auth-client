import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import * as fromRoleTypes from '../../0800 roles/types/_index';
import * as fromSharedTypes from '../../0100 shared/types/_index';

@Injectable()
export class RoleService {
    baseUrl = localStorage.getItem("issuer") + "/api/roles";
    //baseUrl =  environment.authServer + "/api/roles";
    defaultHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    config = { headers: this.defaultHeaders }

    constructor(private http: HttpClient) { }
    
    loadRolePage(page: number, size: number): Observable<fromSharedTypes.PageResponseInterface<fromRoleTypes.RolePageInterface[]>>{
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<fromSharedTypes.PageResponseInterface<fromRoleTypes.RolePageInterface[]>>(this.baseUrl,  {params: params, headers: this.defaultHeaders});
    }
    loadRoleSettings(roleId: string): Observable<fromSharedTypes.BaseResponseInterface<fromRoleTypes.RoleSettingsInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromRoleTypes.RoleSettingsInterface>>(this.baseUrl + '/' + roleId, this.config);
    }
    loadRoleUsageByUsers(roleId: string): Observable<fromSharedTypes.BaseResponseInterface<fromRoleTypes.RoleUsageByUsersInterface[]>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromRoleTypes.RoleUsageByUsersInterface[]>>(this.baseUrl + '/' + roleId + '/users', this.config);
    }
    registerRole(payload: fromRoleTypes.RoleRegisterInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.post<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl, payload, this.config);
    }
    updateRoleSettings(roleId: string, payload: fromRoleTypes.RoleSettingsUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + roleId, payload, this.config);
    }
    deleteRole(roleId: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + roleId, this.config);
    }
  
}