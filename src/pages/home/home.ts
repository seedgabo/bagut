import {Component} from '@angular/core';
import {LoginPage} from '../login/login';
import {Calendar} from '../calendar/calendar';
import {NavController, ModalController, ToastController,Platform} from 'ionic-angular';
import {Api} from '../../providers/api/api';
import {CategoriaPage} from '../categoria/categoria';
import {TicketPage} from '../ticket/ticket';
import {BuscadorPage} from '../buscador/buscador';
import {AgregarTicketPage} from '../agregar-ticket/agregar-ticket';
import {NotificacionesPage} from '../notificaciones/notificaciones';
import {AgregarNotificacionPage} from '../agregar-notificacion/agregar-notificacion';
import {PopoverPage} from '../popover/popover';
declare var $:any;
@Component({
    templateUrl: 'home.html'
})
export class HomePage {
    categorias:any;
    buscar:boolean;
    constructor(platform:Platform, public navCtrl: NavController,public api:Api, public modal:ModalController , public toast:ToastController) {
        setTimeout(()=>{
            this.load();
        },1000);
    }

    load(refresher = null){
        this.api.storage.get("")
        this.api.doLogin().then((data:any) =>
        {
            if(data.nombre)
            {
                this.api.user = data;
                this.api.saveUser(data);
                this.api.saveData();
                this.api.pushRegister();
                this.getCategorias();
                if(refresher != null)
                    refresher.complete();
                $('#calendar').fullCalendar({
                        locale: 'es',
                        defaultView: 'listMonth',
                        buttonIcons: true,
        		    	editable: false,
        		    	eventLimit: true,
                        events: data.events,
                        customButtons: {
            			    verCalendar: {
            			        text: 'Ver Calendario',
            			        click:() => {
                                    this.navCtrl.push(Calendar);
            			        }
            			    },
            			},
                        header: {
                            left: 'prev,next today',
                            center: 'verCalendar',
                        },
                        eventClick: (event)=>{
                            if(event.type  == 'ticket'){
                                this.navCtrl.push(TicketPage,{ticket: event});
                            }
                            else{
                                return;
                            }
                        },
                        eventRender: (event)=>{
                            event.url = null;
                        }
                    })
            }
        }).catch(err =>{
            this.toast.create({message: "Ocurrió un problema de autenticación", duration : 3000}).present().then(()=>{
                this.navCtrl.parent.parent.root = LoginPage;
            })
            console.error(err);
        });
    }

    getCategorias(){
        this.api.getCategorias().then((data:any) =>{
            this.categorias = data;
        })
    }

    navigate(cat){
        this.navCtrl.push(CategoriaPage,{categoria: cat});
    }

    agregarTicket(){
        let modal =this.modal.create(AgregarTicketPage);
        modal.present();
        modal.onWillDismiss((data)=>{
            console.log(data);
        })
    }

    toNotificaciones(){
        this.navCtrl.push(NotificacionesPage);
    }

    agregaNotificacion(){
        let modal = this.modal.create(AgregarNotificacionPage);
        modal.present();
    }

    openBuscador(){
        this.navCtrl.push(BuscadorPage);
    }

}
