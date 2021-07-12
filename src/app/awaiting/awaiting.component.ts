import { Component, OnInit } from '@angular/core';
import { AwaiterService } from '../../service/awaiter.service';

@Component({
  selector: 'app-awaiting',
  templateUrl: './awaiting.component.html',
  styleUrls: ['./awaiting.component.css']
})
export class AwaitingComponent implements OnInit {
  loading: boolean;

  constructor(private awaiterService: AwaiterService) {

    this.awaiterService.isLoading.subscribe((v) => {
      //console.log(v);
      this.loading = v;
    });

  }

  ngOnInit(): void {
  }

}
