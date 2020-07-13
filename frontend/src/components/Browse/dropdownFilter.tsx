// import React from 'react';

// import { DropDownList } from '@progress/kendo-react-dropdowns';

// export default function dropdownFilterCell(data, defaultItem) {
//     return class extends React.Component {
//         render() {
//             return (
//                 <div className="k-filtercell">
//                     <DropDownList
//                         data={data}
//                         onChange={this.onChange}
//                         value={this.props.value || defaultItem}
//                         defaultItem={defaultItem}
//                     />
//                     <button
//                         className="k-button k-button-icon k-clear-button-visible"
//                         title="Clear"
//                         disabled={!this.hasValue(this.props.value)}
//                         onClick={this.onClearButtonClick}
//                     >
//                         <span className="k-icon k-i-filter-clear" />
//                     </button>
//                 </div>
//             );
//         }

//         hasValue = value => Boolean(value && value !== defaultItem);

//         onChange = event => {
//             const hasValue = this.hasValue(event.target.value);
//             this.props.onChange({
//                 value: hasValue ? event.target.value : '',
//                 operator: hasValue ? 'eq' : '',
//                 syntheticEvent: event.syntheticEvent
//             });
//         }

//         onClearButtonClick = event => {
//             event.preventDefault();
//             this.props.onChange({
//                 value: '',
//                 operator: '',
//                 syntheticEvent: event
//             });
//         }
//     };
// }
import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { sampleProducts } from './sampleEvents';

class Filter extends React.Component {
    state = {
        filter: {
            logic: "and",
            filters: [
                { field: "ProductName", operator: "contains", value: "Chef" }
            ]
        }
    };
    render() {
        return (
            <Grid
                style={{ height: '420px' }}
                data={filterBy(sampleProducts, this.state.filter)}
                filterable
                filter={this.state.filter}
                onFilterChange={(e) => {
                    this.setState({
                        filter: e.filter
                    });
                }}
            >
                <Column field="ProductID" title="ID" filterable={false} width="60px" />
                <Column field="ProductName" title="Product Name" />
                <Column field="FirstOrderedOn" width="240px" filter="date" format="{0:d}" />
                <Column field="UnitPrice" width="180px" filter="numeric" format="{0:c}" />
                <Column field="Discontinued" width="190px" filter="boolean" />
            </Grid>
        );
    }
}
export default Filter