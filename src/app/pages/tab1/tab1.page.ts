import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {

  }
  ngOnInit() {
    this.cargarNoticia();
  }

  loadData(event) {
    console.log(event);
    this.cargarNoticia( event );
  }
  
  cargarNoticia( event? ) {
    this.noticiasService.getTopHeadlines().subscribe(
      resp => {
        console.log('noticias ', resp);

        if (resp.articles.length === 0) {
          event.target.disabled = true;
          return;
        }
        //this.noticias = resp.articles;
        this.noticias.push(...resp.articles);

        if ( event ) {
          event.target.complete();
          
        }
      });
  }

}
