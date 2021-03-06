import React from 'react'
import '../App.css';
import * as fromBillsApi from '../api/bills'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'


class CreateBill extends React.Component {

  constructor(props){
    super(props)

    this.state = {		
      
      rows: [],
	  nightsQty : 0,
	  mealsQty : 0,
	  kmsQty : 0,
	  libelleHF : "",
	  montantHF : 0,
	  		
    }
  }


  addRow() {
	  this.setState({
		  rows: [...this.state.rows, {name: '', date:'', qty:'', file:''}]
	  })
  }

  removeRow(i){
	console.log(i)
	let newRows = this.state.rows
	newRows.splice(i,1)
	this.setState({
		rows:newRows
	})
}

  handleChange(e){
	e.preventDefault()
	let name = e.target.name
	this.setState({
		[name]: e.target.value // [ ] : FONCTION GENERIQUE QUI PERMET DE GERER TOUT 
	}, () => console.log(this.state))
  }

  handleRowsChange(e,i) {
	e.preventDefault()
	console.log(e)
	console.log(e.target)

	let { name, value } = e.target // ON RECUPERE LE INPUT DU HTML
	let rows = [...this.state.rows] // SPREAD OPERATOR 
	rows[i] = { 
		...rows[i],
		[name]: value
	}
	this.setState({
		rows: rows
	}, () => console.log(this.state.rows))
}

async postFiche(){
	let km = await fromBillsApi.postBills({idutilisateur: 'a132' , mois:'202103', idFraisForfait:'KM', quantite:this.state.kmsQty})
	let meals = await fromBillsApi.postBills({idutilisateur: 'a132', mois:'202103', idFraisForfait:'REP', quantite:this.state.mealsQty})
	let nigths = await fromBillsApi.postBills({idutilisateur: 'a132', mois:'202103', idFraisForfait:'NUI', quantite:this.state.nightsQty})
	this.state.rows.map(async (f, i) => {
		let horsforfait = await fromBillsApi.postBillsHF({idutilisateur: 'b132', mois:'202004', libelle : f.libelleHF, date: f.date, montant: f.montantHF})

	})
	this.props.history.push('bills')
}


  render () {
    return (
      <body class="d-flex flex-column h-100">
      <Header />
     
      <div className="form-group">
		
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

											<h2 className="title">Ajouter une nouvelle fiche de frais</h2>
											</div>
											<div className="modal-body" >

																							
												<h3> Frais forfaitaires</h3>
												<div class="card border-primary py-3 px-3 mb-3">
													<div class="card-body">
														<table class="table text-center">
															<thead>
															<tr>
																<th scope="col">Frais forfaitaires</th>
																<th scope="col">Quantit??</th>
																<th scope="col">Montant unitaire</th>
																<th scope="col">Total</th>
															</tr>
															</thead>
															<tbody>
															<tr>
																<td><label class="form-control-label"><strong>Nuit??es</strong></label></td>
																<td><input className="form-control form-control-sm" type="number" name="nightsQty" placeholder="Qte" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)}/></td>
																<td>80 ???</td>
																<td> {this.state.nightsQty * 80} <span class="input"> ???</span></td>

															</tr>
															<tr>
																<td><label for="" class="form-control-label"><strong>Repas</strong></label></td>
																<td><input  className="form-control form-control-sm" type="number" name="mealsQty" placeholder="Qte" value={this.state.mealsQty} onChange={(e) => this.handleChange(e)}/></td>
																<td>29 ???</td>
																<td>{this.state.mealsQty * 29} <span class="input"> ???</span></td>
															</tr>
															<tr>
																<td><label for="" class="form-control-label"><strong>Kilom??trage</strong></label></td>
																<td><input className="form-control form-control-sm" type="number" name="kmsQty" placeholder="Qte" value={this.state.kmsQty} onChange={(e) => this.handleChange(e)}/></td>
																<td> 0,80 ??? </td>
																<td>{(this.state.kmsQty * 0.8).toFixed(2)} <span class="input"> ???</span></td>
															</tr>
															</tbody>
														</table>
													</div>
												</div>    
												
											
												<div className="fraishorsforfait">
													<h3>Frais hors-forfaits</h3>
													<button className="btn btn-success btn-sm" onClick={() => this.addRow()}>Ajouter frais hors forfait</button>
												</div>

												<div class="card border-primary py-3 px-3">
													<div class="card-body">
														
														<table class="table text-center">
															<thead>
															<tr>
																<th scope="col">Dates</th>
																<th scope="col">Libell??</th>
																<th scope="col">Montant</th>
																<th scope="col"> Justificatifs</th>
															</tr>
															</thead>
															<tbody>
															{
																	this.state.rows.map((r,i) => {
																		return (
																			<tr key={i}>
																				<td><input type="date" name="date" value={this.state.rows[i].date} onChange={(e) => this.handleRowsChange(e,i)} /> </td>
																				<td><input className="form-control form-control-sm" type="text" name="libelleHF" placeholder="libelle" value={this.state.rows[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
																				<td><input type="number" step="0,01" name="montantHF" placeholder="montant" value={this.state.rows[i].montant} onChange={(e) => this.handleRowsChange(e,i)} /><span class="input"> ???</span></td>
																				<td><input type="file" /></td>
																				<td><button className="btn btn-danger btn-sm" onClick={() => this.removeRow(i)}> x </button> </td>

																			</tr>
																		)
																	})
																}

												
                              
													
															</tbody>
														</table>
													</div>
												</div>
												
												
											</div>
											<div className="modal-footer">
											<button type="button" className="btn btn-lg btn-success" onClick={() => this.postFiche()}>
												Enregistrer
											</button>
											
                      				
											  <Link to="/bills" className="btn btn-danger">Annuler</Link>
                        

											</div>


     
      <Footer />

      </body>
    )
  }
}

export default withRouter(CreateBill);
