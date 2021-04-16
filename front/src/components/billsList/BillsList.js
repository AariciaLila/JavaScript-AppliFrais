import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills';
import Modal from 'react-bootstrap4-modal';


class BillsList extends React.Component {

  constructor(props){
    super(props)

	this.state = {		
		bills: [],
		visible:false,
		rows: [],	
		nightsQty : 0,
		mealsQty : 0,
		kmsQty : 0	
	}

	 this.handleClose = this.handleClose.bind(this);
     this.showModal = this.showModal.bind(this);

  }


  /* FAIRE UN BOUTON QUI OUVRE UN MODAL
  TAPER DANC NAAVIGATEUR => REACT MODAL BOOTSTRAP
  ATTENTION NE RIEN INSTALLER */

  async componentDidMount(){	// recuPERE VALEUR DE LA BDD // ON APPELLE LES 2 FCT POST ON RECUPERE LE BODY
		let bills =  await fromBillsApi.getBills()
		this.setState({bills: bills.result}, () => console.log(this.state))
  }

  showModal(){
		this.setState({
			visible: true
		})
  }

  handleClose(){
		this.setState({
			visible: false
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

  addRow() {
	  this.setState({
		  rows: [...this.state.rows, {name: '', date:'', qty:'', file:''}]
	  })
  }
  async insertBill(bill){
	  let fiche = await this.insertBill(bill)
	  let insertLigne = await insertLigne(bill)

  }

  removeRow(i){
	  console.log(i)
	  let newRows = this.state.rows
	  newRows.splice(i,1)
	  this.setState({
		  rows:newRows
	  })
  }

  // NVLLE FCT POST

  render () {
    return (
    
      <main class="flex-shrink-0">
        <div class="container">
          <h1 class="mt-5">Bienvenue sur votre espace personnel</h1>
          <table class="table table-hover">
									<thead>
									  <tr>
										<th>Mois</th>
										<th>Justificatifs</th>
										<th>Montant</th>
										<th>Date de modification</th>
										<th>Etat</th>
										<th>Action</th>

									  </tr>
									</thead>
									<tbody>
										{
											this.state.bills.map((bill,i) => {
												return(
													<tr>
													<td> {bill.mois} </td>
													<td> {bill.nbJustificatifs}</td>
													<td> {bill.montantValide}</td>
													<td> {bill.dateModif}</td>
													<td> {bill.idEtat}</td>
													<td>
														<button type="button" class="btn btn-info" onClick={this.showModal}>Modifier</button>
													</td>

													</tr>
												)
											})
										} 

			
								
								
	
							
									</tbody>
								  </table>
										<Modal dialogClassName="center modal-80w modal-dialog-scrollable" visible={this.state.visible} onClickBackdrop={() => this.showModal()} >
											<div className="modal-header">
											<h5 className="modal-title">Modification de la fiche</h5>
											</div>
											<div className="modal-body">

																							
												<h3> Frais forfaitaires</h3>
												<div class="card border-primary py-3 px-3 mb-3">
													<div class="card-body">
														<table class="table text-center">
															<thead>
															<tr>
																<th scope="col">Frais forfaitaires</th>
																<th scope="col">Quantité</th>
																<th scope="col">Montant unitaire</th>
																<th scope="col">Total</th>
																<th scope="col">Actions</th>
															</tr>
															</thead>
															<tbody>
															<tr>
																<td><label class="form-control-label"><strong>Nuitées</strong></label></td>
																<td><input className="form-control form-control-sm" type="number" name="nightsQty" placeholder="Qte" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)} />
																</td>
																<td>80€</td>
																<td> {this.state.nightsQty * 80} </td>
																<td>
																	<button type="button" className="btn btn-danger btn-sm mr-2" data-action="delete" data-target="">
																		<i class="fas fa-trash"></i>
																	</button>
																	<button type="button" className="btn btn-success btn-sm" data-action="delete" data-target="">
																		<i class="fas fa-edit"></i>
																	</button>

																</td>
															</tr>
															<tr>
																<td><label class="form-control-label"><strong>Repas</strong></label></td>
																<td><input className="form-control form-control-sm" type="number" name="mealsQty" placeholder="Qte" value={this.state.mealsQty} onChange={(e) => this.handleChange(e)}/></td>
																<td>29€</td>
																<td> {this.state.mealsQty * 29}  </td>
															</tr>
															<tr>
																<td><label for="" class="form-control-label"><strong>Kilométrage</strong></label></td>
																<td><input className="form-control form-control-sm" type="number" name="kmsQty" placeholder="Qte" value={this.state.kmsQty} onChange={(e) => this.handleChange(e)}/></td>
																<td>0,80 €</td>
																<td>{(this.state.kmsQty * 0.8).toFixed(2)} </td>
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
																<th scope="col">Libellé</th>
																<th scope="col">Montant</th>
																<th scope="col"> Justificatifs</th>
																<th scope="col"> Actions</th>
															</tr>
															</thead>
															<tbody>

																{
																	this.state.rows.map((r,i) => {
																		return (
																			<tr key={i}>
																				<th scope="row"><input type="date" name="date" value={this.state.rows[i].date} onChange={(e) => this.handleRowsChange(e,i)} /> </th>
																				<td><input className="form-control form-control-sm" type="text" placeholder="Qte" value={this.state.rows[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
																				<td><input type="text" placeholder="Libelle" value={this.state.rows[i].libelle} onChange={(e) => this.handleRowsChange(e,i)} /></td>
																				<td><input type="file" /></td>
																				<td><button className="btn btn-danger btn-sm" onClick={() => this.removeRow(i)}> x </button> </td>

																			</tr>
																		)
																	})
																}
															<tr>
																<td><input type="date"/></td>
																<td><input type="text"/></td>
																<td><input type="number" step="0,01"/></td>
																<td><input type="file"/></td>
															</tr>
														
															<tr>
																<td><label for="" class="form-control-label"></label></td>
															</tr>
															</tbody>
														</table>
													</div>
												</div>
												
											</div>
											<div className="modal-footer">
											<button type="button" className="btn btn-secondary" onClick={this.handleClose}>
												Enregistrer
											</button>
											<button type="button" className="btn btn-primary" onClick={this.handleClose}>
												Annuler
											</button>
											</div>
										</Modal>
        </div>
		{/* <Col>
                    {this.renderModal()}
         </Col> */}
      </main>
      
  
    )
  }
}

export default BillsList;
