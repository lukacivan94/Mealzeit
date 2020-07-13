import React from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';

export default class RangeFilterCell extends React.Component {
    minTextBox;
    maxTextBox;

    inRange = (current, { min, max }) => (min === null || current >= min) && (max === null || current <= max);

    onChange = (event) => {
        this.props.onChange({
            value: { min: this.minTextBox.value, max: this.maxTextBox.value },
            operator: this.inRange,
            syntheticEvent: event.syntheticEvent
        });
    }

    onClearButtonClick = event => {
        event.preventDefault();
        this.props.onChange({
            value: null,
            operator: '',
            syntheticEvent: event
        });
    }

    render() {
        const value = this.props.value || null;

        return (
            <div>
                Min:
                <span style={{ margin: '0 16px 0 2px' }}>
                    <NumericTextBox
                        width="70px"
                        value={value && value.min}
                        ref={(numeric) => { this.minTextBox = numeric; }}
                        onChange={this.onChange}
                    />
                </span>
                Max:
                <span style={{ margin: '0 2px 0 4px' }}>
                    <NumericTextBox
                        width="70px"
                        value={value && value.max}
                        ref={(numeric) => { this.maxTextBox = numeric; }}
                        onChange={this.onChange}
                    />
                </span>
                <button
                    className="k-button k-button-icon k-clear-button-visible"
                    title="Clear"
                    disabled={!value}
                    onClick={this.onClearButtonClick}
                >
                    <span className="k-icon k-i-filter-clear" />
                </button>
            </div>
        );
    }
}