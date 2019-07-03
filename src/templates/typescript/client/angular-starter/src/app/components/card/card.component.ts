/* ################################################################### */
/*
/*  NotFound page component
/*
/* ################################################################### */

import {
  Component, OnInit, Input, ViewChild, HostBinding, Output, EventEmitter
} from '@angular/core';

/* ------------------------------------------------------------------- */
/*                              Config
/* ------------------------------------------------------------------- */

// =====> Component config
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})

/* ------------------------------------------------------------------- */
/*                              Component
/* ------------------------------------------------------------------- */

export class CardComponent implements OnInit {

  /* ------------------------------------------------------------------- */
  /*                              Vars
  /* ------------------------------------------------------------------- */

  // =====> Input vars
  @Input() title: string;
  @Input() subtitle: string;
  @Input() img: string;
  @Input() alt: string;
  @Input() link: string;
  @Input() linktext: string;
  @Input() class: string;
  @Input() grid?: boolean;

  // =====> Emit event
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  // =====> Element refs
  @ViewChild('cardTitle') cardTitle: any;
  @ViewChild('cardSubTitle') cardSubTitle: any;
  @ViewChild('cardContent') cardContent: any;

  // =====> Bind class to \:host
  @HostBinding('class.Grid') Grid: boolean = false;

  /* ------------------------------------------------------------------- */
  /*                           Constructor
  /* ------------------------------------------------------------------- */

  public constructor() { }

  /* ------------------------------------------------------------------- */
  /*                            Lifecycle
  /* ------------------------------------------------------------------- */

  ngOnInit() {
    this.Grid = this.grid;
    this.cardTitle.nativeElement.style['-webkit-box-orient'] = 'vertical';
    this.cardSubTitle.nativeElement.style['-webkit-box-orient'] = 'vertical';
    this.cardContent.nativeElement.style['-webkit-box-orient'] = 'vertical';
  }

  /* ------------------------------------------------------------------- */
  /*                 Provide out event on action click
  /* ------------------------------------------------------------------- */

  bubbleOut = (e: any) => this.clicked.emit(e)

}
