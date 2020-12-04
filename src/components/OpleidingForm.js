import React, {Component} from 'react';
import OpleidingTable from "./OpleidingTable";

class OpleidingForm extends Component {
    state = {};

    submitHandler = () => {
        this.props.onSubmit(this.state);
    }

    handleFormChange = (event) => {
        const naam = event.target.naam;
        let newOpleiding = {...this.state};
    }

    render() {
        return (
            <div>
                <h2>Nieuwe opleiding:</h2>
                Naam:
                <input name={"naam"} type="text" onChange={this.handleFormChange}/>
                <br/>
                Pmschrijving:
                <input name={"omschrijving"} type="text" onChange={this.handleFormChange}/>
                <br/>
                Prijs:
                <input name={"prijs"} type="text" onChange={this.handleFormChange}/>
                <br/>
                <br />
                <button onClick={this.submitHandler}>Voeg toe</button>
            </div>
        )
    }
}

export default OpleidingForm