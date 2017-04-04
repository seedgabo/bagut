import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {TicketPage} from '../ticket/ticket';
import {Consulta} from '../consulta/consulta';
import {Proceso} from '../proceso/proceso';
import {ProcesoMasivoPage} from '../proceso-masivo/proceso-masivo';
@Component({
    selector: 'page-cliente',
    templateUrl: 'cliente.html'
})
export class Cliente {
    cliente:any;
    constructor(public navCtrl: NavController, public api:Api, public params:NavParams) {
        this.cliente = this.params.get('cliente');
        // console.log(this.cliente);
    }

    ionViewDidLoad() {
    }
    verTicket(ticket_id){
        this.navCtrl.push(TicketPage,{ticket:{id: ticket_id}});
    }
    verProceso(proceso){
        this.navCtrl.push(Proceso,{proceso: proceso, cliente: this.cliente});
    }
    verConsulta(consulta){
        this.navCtrl.push(Consulta,{consulta: consulta, cliente: this.cliente});
    }

    verProcesoMasivo(proceso){
        this.navCtrl.push(ProcesoMasivoPage,{proceso:proceso,cliente: this.cliente});
    }
}
