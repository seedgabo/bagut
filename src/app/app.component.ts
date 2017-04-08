import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,CodePush,InstallMode, } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { Api } from '../providers/api/api';
import { LoginPage } from '../pages/login/login';
import { ClientesHome } from '../pages/clientes-home/clientes-home';
@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage:any= LoginPage;

    constructor(platform: Platform, public api:Api) {
        console.log("angular2 ready")
        this.api.storage.ready().then(()=>{
            console.log("storage ready")
            this.api.storage.get('user').then(data=>{
                console.log(data);
                if (data == undefined)
                    this.rootPage = LoginPage;
                else
                {
                    if(JSON.parse(data).modulos.clientes && JSON.parse(data).iscliente)
                    {
                        this.rootPage = ClientesHome;
                    }
                    else{
                        this.rootPage = TabsPage;
                    }
                }
            });
        });
        platform.ready().then(() => {
            console.log("platform ready")
            Splashscreen.hide();
            StatusBar.styleDefault();
            const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
            CodePush.sync({ installMode: InstallMode.IMMEDIATE, }, downloadProgress).subscribe(
                (syncStatus) => console.log(syncStatus),
                (err)=>{console.warn(err)});
        });

    }
}
