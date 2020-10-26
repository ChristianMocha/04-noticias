import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, private actionSheetCrtl: ActionSheetController, private socialSharing: SocialSharing, private datalocalService: DataLocalService) { }

  ngOnInit() {
    console.log('favoritos', this.enFavoritos);
  }

  abrirNoticia() {
    //console.log("noticia", this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');

  }
  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {
      //borrar de favoritos

      guardarBorrarBtn = {

        text: 'Delete Favorite',
        icon: 'trash',
        handler: () => {
          console.log('delete favorite');
          this.datalocalService.borrarNoticia(this.noticia);
        }

      }

    } else {

      guardarBorrarBtn = {

        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('favorite');
          this.datalocalService.guardarNoticia(this.noticia);
        }

      }

    }

    const actionSheet = await this.actionSheetCrtl.create({


      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
        guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}
