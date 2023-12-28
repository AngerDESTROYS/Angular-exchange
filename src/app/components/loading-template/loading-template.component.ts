import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-template',
  templateUrl: './loading-template.component.html',
  styleUrls: ['./loading-template.component.scss']
})
export class LoadingTemplateComponent {
  @Input() showLoadingMessage: boolean = true;
}
