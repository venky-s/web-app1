import { Component, OnInit } from '@angular/core';
import { FeraService } from '../../../../service/fera.service';
import { FAQ } from '../../../../models/faq';

declare var $: any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  list: FAQ[] = [];

  constructor(private feraService: FeraService) { }

  ngOnInit(): void {
    $('#content-nav li a').removeClass('active');
    $('#content-nav li:nth-child(3) a').addClass('active');
    this.search();
  }

  search(): void {
    this.feraService.searchFAQ(null, true, 0, this.searchResult, true)
  }

  searchResult = (result: []) => {
    if (result !== undefined && result !== null) {
      this.list = result;
    }
  }
}
