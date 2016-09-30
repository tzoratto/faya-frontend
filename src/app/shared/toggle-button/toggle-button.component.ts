import {Component, forwardRef, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Output} from '@angular/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButtonComponent),
    multi: true
};

@Component({
    selector: 'faya-toggle-button',
    templateUrl: 'toggle-button.component.html',
    styleUrls: ['./toggle-button.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ToggleButtonComponent implements ControlValueAccessor {
    private _checked: boolean = false;
    private onChange: (_: any) => {};
    private onTouched: (_: any) => {};
    @Output()
    change = new EventEmitter<boolean>();

    constructor() {

    }

    writeValue(obj: any): void {
        this.checked = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    get checked() {
        return this._checked;
    }

    set checked(value) {
        if (this._checked !== !!value) {
            this._checked = value;
            this.onChange(this._checked);
        }
    }

    onToggle(event) {
        event.stopPropagation();
        this.checked = !this.checked;
        this.change.emit(this.checked);
    }
}
