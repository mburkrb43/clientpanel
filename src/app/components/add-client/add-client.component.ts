import { Component, OnInit } from '@angular/core';

//mhb added Flashmessages and router to redirect if invalid
//mhb also touch app.component for flash-msg support
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

import {ClientService} from '../../services/client.service';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client:Client ={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance: 0
  }
  
  disableBalanceOnAdd:boolean = true;

  constructor(
    public flashMessagesService:FlashMessagesService,
    public router:Router,
    public clientService:ClientService
  ) { }

  ngOnInit() {
  }
  onSubmit({value,valid}:{value:Client,valid:boolean}){
    if (this.disableBalanceOnAdd){
        value.balance = 0; //set for new Client to send value to server
    }
    if(!valid){
      console.log("not valid");
      this.flashMessagesService.show('Please correct form',{cssClass:'alert-danger',timeout:4000});
      this.router.navigate(['add-client']);
    }
    else{
      console.log(value);
      this.clientService.newClient(value);
       this.flashMessagesService.show('New client added',{cssClass:'alert-success',timeout:4000});
      this.router.navigate(['/']);
    }
  }
}
