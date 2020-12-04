import React, {Component} from 'react';
import OpleidingForm from './OpleidingForm.js'

class OpleidingTable extends Component {


    state = {
        opleidingen: []
    };

    componentDidMount = () => {
        fetch("http://localhost:8080/api/getall", {
            method: "GET",
            headers: {
                'accept':'application/json'
            }
        })
            .then(resp => {
                if (resp.ok)
                    return resp.json();
                console.log("Error: ", resp);
            })
            .then(json => {
                console.log("Opleidingen: ", json);
                this.setState( {opleidingen: json})
            })
            .catch(er => {
                console.log("Error: ", er)
            })
    }

    delete = (id) => {
        fetch("http://localhost:8080/api/delete?id="+id, {
            method: "DELETE",
            headers: {
                'accept':'application/json'
            }
        })
            .then(resp => {
                if (!resp.ok)
                console.log("Error: ", resp);
            })
            .catch(er => {
                console.log("Error: ", er)
            });
        this.setState( {opleidingen: []})
        this.componentDidMount();
    }

    test = (word) => {
        console.log(word)
    }

    createOpleidingHandler = (opleidingForm) => {
        let newOpleiding = {
            naam: opleidingForm.naam,
            omschrijving: opleidingForm.omschrijving,
            prijs: opleidingForm.prijs,
        }

        fetch("http://localhost:8080/api/save", {
            method: "PUT",
            headers: {
                'accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOpleiding)
        })
            .then(resp => {
                if (resp.ok)
                    console.log("Added product");
            })
            .catch(er => {
                console.log("Error: ", er)
            });
    }

    render(){
        return (
            <div>
                <table border="5">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>category</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.opleidingen.map((opleidingen, index) => {
                            return <tr key={opleidingen.id}>
                                <td>{opleidingen.naam}</td>
                                <td>{opleidingen.omschrijving}</td>
                                <td>{opleidingen.prijs}</td>
                                <td>
                                    <button onClick={(e) => this.delete(opleidingen.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                <OpleidingForm onSubmit={this.createOpleidingHandler}></OpleidingForm>
            </div>
        )
    };
}

export default OpleidingTable