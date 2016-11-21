import {Component, forwardRef, Output, EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerComponent),
    multi: true
};

const noop = () => {};

@Component({
    selector: 'faya-datetime-picker',
    templateUrl: 'datetime-picker.component.html',
    styleUrls: ['datetime-picker.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DateTimePickerComponent implements ControlValueAccessor {
    private _dateTime: Date;
    private date: Date;
    private onChange: (_: any) => void = noop;
    private onTouched: (_: any) => void = noop;

    @Output()
    private close = new EventEmitter();

    @Output()
    private selectionDone = new EventEmitter();

    constructor() {
    }

    writeValue(obj: any): void {
        this.dateTime = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    get dateTime(): Date {
        return this._dateTime;
    }

    set dateTime(value: Date) {
        this._dateTime = value;
        this.date = value;
        this.onChange(this._dateTime);
    }

    onClickClose() {
        this.close.emit();
    }

    onSelectionDone() {
        setTimeout(() => {
            if (this.dateTime) {
                this.date.setHours(this.dateTime.getHours());
                this.date.setMinutes(this.dateTime.getMinutes());
            }
            this.dateTime = this.date;
            this.selectionDone.emit();
        }, 0);
    }
}
