import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../providers/api/api'
import { TicketPage } from '../ticket/ticket';
declare var $:any;
@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})
export class Calendar {

    constructor(public navCtrl: NavController, public api:Api, public zone:NgZone){}

    ionViewDidEnter(){
        this.initCalendar();
    }


    initCalendar(){
        $('#calendario').fullCalendar({
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
        console.log("render");
    }
}
