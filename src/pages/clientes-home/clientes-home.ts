import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import {LoginPage} from '../login/login';
import {TicketPage} from '../ticket/ticket';
import {NotificacionesPage} from '../notificaciones/notificaciones';
import {Facturas} from '../facturas/facturas';
declare var moment:any;
@Component({
    selector: 'page-clientes-home',
    templateUrl: 'clientes-home.html'
})
export class ClientesHome {
    tickets:any;
    query:string="";
    constructor(public navCtrl: NavController, public  api:Api, public modal:ModalController ) {}

    ionViewDidLoad() {
        window.setTimeout(()=>{
            this.getTickets();

        },1000);
    }

    getTickets(){
        this.api.getTicketsClientes().then((data)=>{
            this.tickets = data;
        }).catch(() =>{
            console.error("Error al obtener los tickets")
        });
    }

    toLogin(){
        let root:NavController = this.navCtrl;
        this.api.user = {};
        this.api.storage.remove("user");
        root.setRoot(LoginPage);
    }

    verTicket(ticket){
        this.navCtrl.push(TicketPage, {ticket: ticket});
    }


    perfil(){
        // this.navCtrl.push(Profile);
    }

    MisFacturas(){
        this.navCtrl.push(Facturas);
    }

    toNotificaciones(){
        this.navCtrl.push(NotificacionesPage);
    }

    fechar(fecha){
        return moment(fecha).format("dddd,D MMMM  YYYY, h:mm:ss a");
    }


}
