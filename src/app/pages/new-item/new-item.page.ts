import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ItemService } from '../../services/sync/item.service';
import { ToastController } from '@ionic/angular';
import { OfflineNotifier } from '../../components/offline.notifier';
import { toIdValue } from 'apollo-utilities';
import gql from 'graphql-tag';
import { getFragmentQueryDocument } from 'apollo-utilities';


@Component({
  selector: 'new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage extends OfflineNotifier implements OnInit {

  new_item_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private itemService: ItemService,
    toastController: ToastController
  ) {
    super(toastController);
  }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    // this.itemService.getClient().addResolvers()
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }



  createItem(value) {
    const client = this.itemService.getClient();
    this.itemService.createItem(value.title, value.description).then(result => {
      console.log('Got result from server for mutation', result);


      const fragment = gql`
          fragment cacheTask on Task {
            title
            description
          }
        `;
      // We will get this from server so chillax
      const id = `Task:${result.data.createTask.id}`;
      // const query = gql`{
      //   getObjectBase(objectId: id) @client  
      // }`;
      const idVal = toIdValue({
        id: id,
        typename: `Task`
      }); 

     const readResult = client.cache.read({
        query: getFragmentQueryDocument(fragment, null),
        variables: {},
        rootId: id,
        optimistic: false,
     });
     console.log(`fragment result ${readResult}`);
   
      // const resultFromCache = client.readFragment({fragment, id}, false);
      // resultFromCache.then(() => {
       
      // }).catch((err)=>{
      //   console.log(`ERR result ${err}`);
      // })
      this.new_item_form.reset();
      this.goBack();
    }).catch((error) => {
      this.handleOfflineMutation(error);
      this.new_item_form.reset();
      this.goBack();
    });
  }

}
