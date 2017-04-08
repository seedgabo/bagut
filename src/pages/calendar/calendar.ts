import { Component, NgZone } from '@angular/core';
import {ToastController, NavController} from 'ionic-angular';
import { Api } from '../../providers/api/api'
import { TicketPage } from '../ticket/ticket';
declare var $:any;
@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})
export class Calendar {
	calendar = undefined;
    constructor(public navCtrl: NavController, public api:Api,public toast:ToastController ,public zone:NgZone){}

    ionViewDidEnter(){
        this.initCalendar();
    }
	
	reload($refresher){
		this.api.get('getEventos').then(
			(data)=>{
				this.api.user.events = data;
				this.api.saveUser(this.api.user);
				console.log(data);
				this.calendar.removeEvents();
				this.calendar.fullCalendar( 'updateEvents', data );
				$refresher.complete();
			}
		)
		.catch(
			(err)=>{
				this.toast.create({message:"No se pudo actualizar", duration: 2000}).present();
				$refresher.complete();
			}
		)

	}


    initCalendar(){
        this.calendar = $('#calendario').fullCalendar({
            locale: 'es',
            defaultView: 'month',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            buttonIcons: true,
            editable: false,
            eventLimit: true,
            events: this.api.user.events,
            eventClick: (event)=>{
                if(event.type  == 'ticket'){
                    this.navCtrl.push(TicketPage,{ticket: event});
                }
                else{
                    return;
                }
            },
            eventRender: (event,el,view)=>{
                event.url = null;
            }
        });
    }
}
