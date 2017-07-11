import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {


  /**
   * Max value to be displayed
   * @type number
   */
  @Input() max = 0;

  /**
   * Current value tp be displayed
   * @type {number}
   */
  @Input() value = 0;

  /**
   * Indicates if the stripes of the progress bar should be animated.
   */
  @Input() animated: Boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Get current value to display
   * @returns {number}
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Get maximum value to display
   * @returns {number}
   */
  getMax(): number {
    return this.max;
  }

  /**
   * Get current value to display in percent
   * @returns {number}
   */
  getPercentValue(): number {
    return 100 * this.getValue() / this.max;
  }
}
