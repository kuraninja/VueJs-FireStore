<template>
  <div class="cars">
    <h3>Cars</h3>
    <div class="card">
      <div class="card-header">
        Add a new cars
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Brand</label>
            <input v-model="carData.car_brand" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Color</label>
            <input v-model="carData.car_color" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Year</label>
            <input v-model="carData.car_year" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Model</label>
            <input v-model="carData.car_model" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Mileage</label>
            <input v-model="carData.car_mileage" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>

          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Cars List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Car Brand
                </th>
                <th>
                  Car Color
                </th>
                <th>
                  Car Year
                </th>
                <th>
                  Car Model
                </th>
                <th>
                  Car Mileage
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in cars" v-bind:key="car.id">
                <template v-if="editId == car.id">
                  <td><input v-model="editCarData.car_brand" type="text"></td>
                  <td><input v-model="editCarData.car_color" type="text"></td>
                  <td><input v-model="editCarData.car_year" type="text"></td>
                  <td><input v-model="editCarData.car_model" type="text"></td>
                  <td><input v-model="editCarData.car_mileage" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(car.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{car.car_brand}}
                  </td>
                  <td>
                    {{car.car_color}}
                  </td>
                  <td>
                    {{car.car_year}}
                  </td>
                  <td>
                    {{car.car_model}}
                  </td>
                  <td>
                    {{car.car_mileage}}
                  </td>

                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(car.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(car)" class="fa fa-pencil"></i>
                    </a>
                    <router-link
                    :to="{
                      name:'CarDetails',
                      params:{id: car.id}
                    }"
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>



<div class="card mt-8">
      <div class="card-header">
        Cars Rental Date
      </div>
      <div> Search your car Model and hit Enter
      </div>
        <input @keyup.enter="onSearch" v-model='query'>
        <br>
        <div style="font-weight:bold">You search for this {{query}} car model </div>
        </br>
        </input>
      <table class="table">

      <template v-if="results.length">
      <tr>
          <th scope='col'> Your Car Model </th>
          <th> Your Car Brand </th>
          <th> Your Car Color </th>
      </tr>

        <tr v-for="result in results" :key='result.id'>

              <td>{{ result.car_model }}</td>
              <td>{{ result.car_brand }}</td>
              <td>{{ result.car_color }}</td>

          </tr>

      </template>
      <template v-else> Sorry no search result for {{query}} yet, please search again </template>

      </table>
  </div>
  <div class="card mt-8">
<label for="id_select">This selection has this IDs: </label>
    <select id="id_select" v-model="carID" @change="getRentalsID" >

      <option v-for="result in results" :key='result.id' >  {{result.id}}
        </option>

      </select>
      <table class="table">

      <thead>
              <tr>
                <th scope="col">
                  Rental Start
                </th>
                <th>
                  Rental End
                </th>
                <th>
                  Rental Cost
                </th>
                <th>
                  Action
                </th>
              </tr>
      </thead>
      <tbody>
              <tr v-for="rentalid in rentalids" v-bind:key="rentalid.id">
                <template v-if="editRentalId == rentalid.id">
                  <td><input v-model="editRentalData.rental_start" type="text"></td>
                  <td><input v-model="editRentalData.rental_end" type="text"></td>
                  <td><input v-model="editRentalData.rental_cost" type="text"></td>

                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmitRental(rentalid.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{rentalid.rental_start}}
                  </td>
                  <td>
                    {{rentalid.rental_end}}
                  </td>
                  <td>
                    {{rentalid.rental_cost}}
                  </td>
                  <td>
                    <a  href="#" class="icon">
                      <i v-on:click="onDeleteRental(rentalid.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEditRental(rentalid)" class="fa fa-pencil"></i>
                    </a>
                    <router-link
                    :to="{
                      name:'RentalDetails',
                      params:{carId: carID, rentalId: rentalid.id}
                    }"
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </template>
              </tr>

      </tbody>
      </tr>
      </table>
  </div>
  <div class="card-body">

        <template v-if="rentalids.length">
          <div v-if="results.length"> Add more Booking for Car Model : {{query}}</div>
        <form class="form-inline" v-on:submit.prevent="onSubmitRentalID">

          <div class="form-group">
            <label>Start Date</label>
            <input v-model="rentalData.rental_start" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input v-model="rentalData.rental_end" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Cost</label>
            <input v-model="rentalData.rental_cost" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Book the car</button>
          </div>
        </form>
        </template>

        <template v-else> Sorry no booking yet </template>
    </div>

  </div>

</template>

<script>
import db from '@/db'
export default {
  name: 'Car',
  data () {
    return {
      query:'',
      carID:'',
      editId: '',
      editRentalId: '',
      carData: {
        'id' : '',
        'car_brand' : '',
        'car_color': '',
        'car_year': '',
        'car_model':'',
        'car_mileage': ''
      },
      editCarData: {
        'id': '',
        'car_brand' : '',
        'car_color': '',
        'car_year': '',
        'car_model':'',
        'car_mileage': ''
      },
      rentalData:{
        'rental_start': '',
        'rental_end': '',
        'rental_cost':''
      },
      editRentalData:{
        'rental_start': '',
        'rental_end': '',
        'rental_cost':''
      },
      cars: [],
      rentals: [],
      rentalids: [],
      results: []
    }
  },
  created() {
    this.getCars();
  },
  methods: {
    getCars() {
      db.collection('cars').get().then(querySnapshot =>{
        const cars = []
        const carsArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          carsArray.push(doc.data())
          carsArray[i].id = doc.id
          cars.push(carsArray[i])
          i++
        })

        this.cars = cars

      })
    }
    ,
    onSearch(){
      db.collection('cars').where('car_model','==', this.query).get().then(snapshot => {
        const results= []
        const resultsArray = []
        let i = 0
          snapshot.forEach(doc => {
            resultsArray.push(doc.data())
            resultsArray[i].id=doc.id
            results.push(resultsArray[i])
            i++

          });
          this.results=results
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    },
    getRentalsID() {
      db.collection('cars').doc(this.carID).collection('rentals').get().then(querySnapshot =>{
        const rentalids = []

        const rentalidsArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          rentalidsArray.push(doc.data())
          rentalidsArray[i].id = doc.id
          rentalids.push(rentalidsArray[i])
          i++
        })

        this.rentalids = rentalids

      })
    },
    onSubmit(){
      db.collection('cars').add(this.carData).then(this.getCars)
      this.carData.id=''
      this.carData.car_brand = ''
      this.carData.car_color = ''
      this.carData.car_year  =''
      this.carData.car_model =''
      this.carData.car_mileage= ''

    },

    onSubmitRentalID(){
      db.collection('cars').doc(this.carID).collection('rentals').add(this.rentalData).then(this.getRentalsID)

      //this.rentalData.id = ''
      this.rentalData.rental_start=''
      this.rentalData.rental_end=''
      this.rentalData.rental_cost=''

    },

    onDelete(id){
      db.collection('cars').doc(id).delete().then((data)=> {
          this.getCars()
      })
    },
    onDeleteRental(id){
      db.collection('cars').doc(this.carID).collection('rentals').doc(id).delete().then((data)=> {
          this.getRentalsID()
      })
    },
    onEdit(car){
      this.editId = car.id
      this.editCarData.car_brand = car.car_brand
      this.editCarData.car_color = car.car_color
      this.editCarData.car_year = car.car_year
      this.editCarData.car_model = car.car_model
      this.editCarData.car_mileage = car.car_mileage
    },
    onEditRental(rentalid){
      this.editRentalId = rentalid.id
      this.editRentalData.rental_start=rentalid.rental_start
      this.editRentalData.rental_end=rentalid.rental_end
      this.editRentalData.rental_cost=rentalid.rental_cost

    },
    onCancel(){
      this.editId = ''
      this.editRentalId=''
      this.editCarData.car_brand = ''
      this.editCarData.car_color = ''
      this.editCarData.car_year = ''
      this.editCarData.car_model = ''
      this.editCarData.car_mileage = ''
      this.editCarData.car_brand = ''


    },

    onEditSubmit (id){
      db.collection("cars").doc(id).set(this.editCarData).then(
        this.getCars)
        this.editId = ''
        this.editCarData.car_brand = ''
        this.editCarData.car_color = ''
        this.editCarData.car_year = ''
        this.editCarData.car_model = ''
        this.editCarData.car_mileage = ''

    },
    onEditSubmitRental (id){
      db.collection("cars").doc(this.carID).collection('rentals').doc(id).set(this.editRentalData).then(
        this.getRentalsID)

this.editRentalId=''

        this.editRentalData.rental_start=''
        this.editRentalData.rental_end=''
        this.editRentalData.rental_cost=''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}
</style>
