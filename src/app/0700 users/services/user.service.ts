import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as fromSharedTypes from '../../0100 shared/types/_index';
import * as fromUserTypes from '../types/_index';

@Injectable()
export class UserService {
    baseUrl = localStorage.getItem("issuer") + "/api/users";
    defaultHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    config = { headers: this.defaultHeaders }

    constructor(private http: HttpClient) { }
    
    loadUserPage(page: number, size: number): Observable<fromSharedTypes.PageResponseInterface<fromUserTypes.UserPageInterface[]>>{
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http.get<fromSharedTypes.PageResponseInterface<fromUserTypes.UserPageInterface[]>>(this.baseUrl, {params: params, headers: this.defaultHeaders});
    }
    loadUserSettings(userId: string): Observable<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserSettingsInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserSettingsInterface>>(this.baseUrl + '/' + userId + '/settings', this.config);
    }
    updateUserSettings(userId: string, userSettings: fromUserTypes.UserSettingsUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId + '/settings',userSettings, this.config);
    }
    loadUserProfile(userId: string): Observable<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserProfileInterface>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserProfileInterface>>(this.baseUrl + '/' + userId + '/profile', this.config);
    }
    updateUserProfile(userId: string, userProfile: fromUserTypes.UserProfileUpdateInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId + '/profile', userProfile, this.config);
    }
    loadUserRoles(userId: string): Observable<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserRoleInterface[]>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserRoleInterface[]>>(this.baseUrl + '/' + userId + '/roles', this.config);
    }
    addUserRoles(userId: string, roleIds: string[]): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId + '/roles',  {roleIds: roleIds}, this.config);
    }
    removeUserRoles(userId: string, roleId: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId + '/roles/' + roleId, this.config);
    }
    loadUserAuthorities(userId: string): Observable<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserAuthorityInterface[]>>{
        return this.http.get<fromSharedTypes.BaseResponseInterface<fromUserTypes.UserAuthorityInterface[]>>(this.baseUrl + '/' + userId + '/authorities', this.config);
    }
    addUserAuthorities(userId: string, authorityIds: string[]): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.put<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId + '/authorities',  {authorityIds: authorityIds}, this.config);
    }
    removeUserAuthorities(userId: string, authorityId: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId + '/authorities/' + authorityId, this.config);
    }
    registerUser(payload: fromUserTypes.UserRegisterInterface): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.post<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl, payload, this.config);
    }
    deleteUser(userId: string): Observable<fromSharedTypes.BaseResponseInterface<Object>>{
        return this.http.delete<fromSharedTypes.BaseResponseInterface<Object>>(this.baseUrl + '/' + userId, this.config);
    }
}