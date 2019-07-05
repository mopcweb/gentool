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
  styleUrls: ['./card.component.sass'],
  templateUrl: './card.component.html'
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
  @ViewChild('cardTitle', { static: true }) cardTitle: any;
  @ViewChild('cardSubTitle', { static: true }) cardSubTitle: any;
  @ViewChild('cardContent', { static: true }) cardContent: any;

  // =====> Bind class to \:host
  @HostBinding('class.Grid') Grid = false;

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

  bubbleOut = (e: any) =>
    this.clicked.emit(e)

}
