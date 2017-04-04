import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Push} from 'ionic-native';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import  { Api } from 'api/api';
@Injectable()
export class ApiClient {

    username:string;
    password:string;
    token:string;
    url:string = 'http://newton.eycproveedores.com/newton/public/' ;
    user:any={token: null};
    pushData:any;
    constructor(public http: Http, private platform:Platform, public storage:Storage) {
    }

    private setHeaders(){
        let headers = new Headers();
        if(this.user.token)
            headers.append("Auth-Token", this.user.token);
        headers.append("Authorization","Basic " + btoa(this.username + ":" + this.password));
        headers.append('Content-Type' , 'application/x-www-form-urlencoded');
        return headers;
    }

    private handleData(res){
        if(res.statusText == "Ok"){
            return {status: "No Parace haber conexión con el servidor"};
        }

        // If request fails, throw an Error that will be caught
        if(res.status < 200 || res.status >= 300) {
            return {error: res.status}
        }
        // If everything went fine, return the response
        else {
            return res;
        }
    }
}
