import { Component, Input } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
    selector: 'counter-alone',
    standalone: true,
    templateUrl: './counter-alone.component.html',
    styleUrl: './counter-alone.component.css',
    imports: [SideMenuComponent]
})
export class CounterAloneComponent {

  @Input()
  public counter: number = 10;

}
